import tensorflow as tf
import pandas as pd
from tensorflow.keras import layers, models
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler

data = pd.read_csv("data/train.csv")

x = data.loc[:, "tavg":]
scaler = StandardScaler()
x = pd.DataFrame(scaler.fit_transform(x), columns=x.columns)
y = data["TotalConsumption"]
y_scaler = StandardScaler()
y = y_scaler.fit_transform(y.values.reshape(-1, 1)).flatten()

model = models.Sequential()

model.add(layers.Dense(16))
model.add(layers.Dense(8))
model.add(layers.Dense(1, activation=None))

model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=0.001), loss='mse')

model.save("ThermaSenseModel")

#predictions = y_scaler.inverse_transform(model.predict(x))

loss = model.fit(x, y, epochs=10)
