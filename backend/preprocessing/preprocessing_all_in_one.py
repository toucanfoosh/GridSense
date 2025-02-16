import pandas as pd
import matplotlib.pyplot as plt
from dateutil.relativedelta import relativedelta
from datetime import datetime
import numpy as np
import os

def load_and_clean_data():
    """Step 1: Load and clean the initial data"""
    # Get script directory path
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Load the datasets with absolute paths
    weather_data = pd.read_csv(os.path.join(script_dir, "weather_data.csv"))
    energy_data = pd.read_csv(os.path.join(script_dir, "energy_data.csv"))

    # Convert date columns to datetime objects
    energy_data['FromDate'] = pd.to_datetime(energy_data['FromDate'])
    energy_data['ToDate'] = pd.to_datetime(energy_data['ToDate'])

    # Define the date range
    start_date = pd.to_datetime('2012-11-01')
    end_date = pd.to_datetime('2024-02-29')

    # Filter the energy data based on the date range
    energy_data_filtered = energy_data[(energy_data['FromDate'] >= start_date) & (energy_data['ToDate'] <= end_date)]

    # Filter and prepare Natural Gas data
    natural_gas_data = energy_data_filtered[energy_data_filtered['EnergyTypeName'] == 'Natural Gas']
    natural_gas_data = natural_gas_data[['EnergyTypeName', 'InvoiceDate', 'FromDate', 'ToDate', 'TotalCost', 'TotalConsumption', 'UsagePeriodDays']]

    # Filter and prepare Electric data
    electric_data = energy_data_filtered[energy_data_filtered['EnergyTypeName'] == 'Electric']
    electric_data = electric_data[['EnergyTypeName', 'InvoiceDate', 'FromDate', 'ToDate', 'TotalCost', 'TotalConsumption', 'UsagePeriodDays']]

    # Keep only the specified columns in weather_data
    weather_data = weather_data[['time', 'tavg', 'tmin', 'tmax', 'prcp', 'wspd', 'pres']]
    
    return weather_data, electric_data, natural_gas_data

def aggregate_monthly_data(weather_data, electric_data, natural_gas_data):
    """Step 2: Aggregate data to monthly intervals"""
    # Convert date columns to datetime
    weather_data['time'] = pd.to_datetime(weather_data['time'])
    electric_data['InvoiceDate'] = pd.to_datetime(electric_data['InvoiceDate'])
    natural_gas_data['InvoiceDate'] = pd.to_datetime(natural_gas_data['InvoiceDate'])

    # Process energy data (both electric and natural gas)
    monthly_data = {}
    for energy_type, df in [("Electric", electric_data), ("Natural Gas", natural_gas_data)]:
        # Filter out long billing periods
        df_filtered = df[df['UsagePeriodDays'] <= 45]
        
        # Extract month and year from FromDate
        df_filtered['YearMonth'] = df_filtered['FromDate'].dt.to_period('M')
        
        # Aggregate by month
        monthly = df_filtered.groupby('YearMonth').agg({
            'TotalConsumption': 'sum',
            'TotalCost': 'sum',
            'UsagePeriodDays': 'mean'
        }).reset_index()
        
        # Convert YearMonth to datetime
        monthly['Month'] = monthly['YearMonth'].dt.to_timestamp()
        monthly.drop('YearMonth', axis=1, inplace=True)
        
        monthly_data[energy_type.lower().replace(" ", "_")] = monthly

    # Aggregate weather data by month
    weather_data['YearMonth'] = weather_data['time'].dt.to_period('M')
    monthly_weather = weather_data.groupby('YearMonth').agg({
        'tavg': 'mean',
        'tmin': ['mean', 'min'],
        'tmax': ['mean', 'max'],
        'prcp': 'sum',
        'wspd': 'mean',
        'pres': 'mean'
    }).reset_index()

    # Flatten column names
    monthly_weather.columns = ['YearMonth', 
                             'tavg_mean',
                             'tmin_mean', 'tmin_peak',
                             'tmax_mean', 'tmax_peak',
                             'prcp_sum',
                             'wspd_mean',
                             'pres_mean']

    monthly_weather['Month'] = monthly_weather['YearMonth'].dt.to_timestamp()
    monthly_weather.drop('YearMonth', axis=1, inplace=True)
    
    return monthly_weather, monthly_data['electric'], monthly_data['natural_gas']

def merge_monthly_data(weather_data, electric_data, natural_gas_data):
    """Step 3: Merge all monthly data into a single dataset"""
    # Add suffixes to distinguish between energy types
    electric_data = electric_data.add_suffix('_electric')
    natural_gas_data = natural_gas_data.add_suffix('_gas')

    # Rename Month columns back
    electric_data = electric_data.rename(columns={'Month_electric': 'Month'})
    natural_gas_data = natural_gas_data.rename(columns={'Month_gas': 'Month'})

    # Merge electric and gas data
    energy_data = pd.merge(
        electric_data,
        natural_gas_data,
        on='Month',
        how='outer'
    )

    # Merge with weather data
    merged_data = pd.merge(
        weather_data,
        energy_data,
        on='Month',
        how='inner'
    )

    # Sort by date
    merged_data = merged_data.sort_values('Month')
    
    return merged_data

def analyze_and_visualize(df):
    """Step 4: Analyze and visualize the data"""
    # Get script directory path
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Check for missing months
    print("=== Temporal Coverage Check ===")
    all_months = pd.date_range(start=df['Month'].min(), end=df['Month'].max(), freq='MS')
    missing_months = all_months.difference(df['Month'])
    print(f"Missing months: {len(missing_months)}")
    if not missing_months.empty:
        print("Missing dates:", missing_months.strftime('%Y-%m').tolist())

    # Check for NaN values
    print("\n=== NaN Value Check ===")
    nan_report = df.isna().sum()
    print(nan_report[nan_report > 0].to_string() or "No NaN values found")

    # Data validity checks
    print("\n=== Data Validity Checks ===")
    print("Electric:")
    print("- Negative Consumption Values:", len(df[df['TotalConsumption_electric'] < 0]))
    print("- Negative Cost Values:", len(df[df['TotalCost_electric'] < 0]))
    print("- Zero Consumption Values:", len(df[df['TotalConsumption_electric'] == 0]))

    print("\nNatural Gas:")
    print("- Negative Consumption Values:", len(df[df['TotalConsumption_gas'] < 0]))
    print("- Negative Cost Values:", len(df[df['TotalCost_gas'] < 0]))
    print("- Zero Consumption Values:", len(df[df['TotalConsumption_gas'] == 0]))

    # Create visualizations
    fig = plt.figure(figsize=(15, 12))

    # Energy Consumption Trends
    ax1 = plt.subplot(3, 2, 1)
    ax1.plot(df['Month'], df['TotalConsumption_electric'], label='Electric')
    ax1.plot(df['Month'], df['TotalConsumption_gas'], label='Natural Gas')
    ax1.set_title('Energy Consumption Trends')
    ax1.legend()
    plt.xticks(rotation=45)

    # Energy Cost Trends
    ax2 = plt.subplot(3, 2, 2)
    ax2.plot(df['Month'], df['TotalCost_electric'], label='Electric')
    ax2.plot(df['Month'], df['TotalCost_gas'], label='Natural Gas')
    ax2.set_title('Energy Cost Trends')
    ax2.legend()
    plt.xticks(rotation=45)

    # Temperature vs Electric Consumption
    ax3 = plt.subplot(3, 2, 3)
    ax3.scatter(df['tavg_mean'], df['TotalConsumption_electric'], alpha=0.6)
    ax3.set_xlabel('Average Temperature (°C)')
    ax3.set_ylabel('Electric Consumption')
    ax3.set_title('Temperature vs Electric Consumption')

    # Temperature vs Gas Consumption
    ax4 = plt.subplot(3, 2, 4)
    ax4.scatter(df['tavg_mean'], df['TotalConsumption_gas'], alpha=0.6)
    ax4.set_xlabel('Average Temperature (°C)')
    ax4.set_ylabel('Gas Consumption')
    ax4.set_title('Temperature vs Gas Consumption')

    # Weather Metrics
    ax5 = plt.subplot(3, 2, 5)
    ax5.plot(df['Month'], df['prcp_sum'], label='Precipitation')
    ax5.set_title('Monthly Precipitation')
    plt.xticks(rotation=45)

    # Temperature Range
    ax6 = plt.subplot(3, 2, 6)
    ax6.fill_between(df['Month'], df['tmin_peak'], df['tmax_peak'], alpha=0.3, label='Temperature Range')
    ax6.plot(df['Month'], df['tavg_mean'], color='black', linewidth=1, label='Average Temp')
    ax6.set_title('Temperature Range')
    ax6.legend()
    plt.xticks(rotation=45)

    plt.tight_layout()
    plt.savefig(os.path.join(script_dir, 'energy_analysis_plots.png'), dpi=300, bbox_inches='tight')
    print(f"\nSaved visualization: {os.path.join(script_dir, 'energy_analysis_plots.png')}")

def main():
    # Step 1: Load and clean data
    print("Step 1: Loading and cleaning data...")
    weather_data, electric_data, natural_gas_data = load_and_clean_data()
    
    # Step 2: Aggregate to monthly
    print("Step 2: Aggregating data to monthly intervals...")
    monthly_weather, monthly_electric, monthly_natural_gas = aggregate_monthly_data(
        weather_data, electric_data, natural_gas_data
    )
    
    # Step 3: Merge all data
    print("Step 3: Merging all monthly data...")
    merged_data = merge_monthly_data(monthly_weather, monthly_electric, monthly_natural_gas)
    
    # Save the final merged dataset
    merged_data.to_csv(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'joined_energy_and_weather_data.csv'), index=False)
    print(f"\nSaved merged dataset to: {os.path.join(os.path.dirname(os.path.abspath(__file__)), 'joined_energy_and_weather_data.csv')}")
    
    # Step 4: Analyze and visualize
    print("\nStep 4: Analyzing and visualizing data...")
    analyze_and_visualize(merged_data)

if __name__ == "__main__":
    main()
