interface Props {
  result: number;
  query: string;
}

export default function Result(props: Props) {
  const result = props.result;
  const query = props.query;

  return (
    <div className="rounded-lg gs-border-tertiary p-4 w-full h-full">
      {result ? (
        <>
          <div className="text-lg">We expect you to use</div>
          <div className="text-2xl font-bold">{result}</div>
          <div className="text-lg">ounces of heating oil this month</div>
          <div className="text-sm">For the zip code of {query}</div>
        </>
      ) : (
        <>
          <div className="text-lg gs-color-danger">
            An error occurred. Please verify your zip code and try again.
          </div>
        </>
      )}
    </div>
  );
}
