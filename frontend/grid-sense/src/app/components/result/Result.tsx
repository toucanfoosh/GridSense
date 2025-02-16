interface Props {
  result: number;
}

export default function Result(props: Props) {
  const { result } = props;

  return (
    <div className="rounded-lg gs-border-tertiary p-4 w-full h-full">
      <div className="text-2xl">Result</div>
      <div className="text-lg">The result is: {result}</div>
    </div>
  );
}
