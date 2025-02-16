interface Props {
  result: number;
  query: string;
}

export default function Result(props: Props) {
  const result = props.result;
  const query = props.query;

  return (
    <div className="rounded-lg gs-border-tertiary p-4 w-full h-full">
      <div className="text-lg">We expect you to use</div>
      <div className="text-2xl font-bold">{result}</div>
      <div className="text-lg">ounces of heating oil this month</div>
      <div className="text-sm">
        Compared to the average of {result} ounces per month for the zip code{" "}
        {query}
      </div>
    </div>
  );
}
