/* eslint-disable @typescript-eslint/no-explicit-any */
export const onCreateRoute = (method: string, descriptor: any) => {
  const [path, ...handlers] = descriptor;
  console.log(
    "\x1b[35m%s\x1b[0m",
    method.toUpperCase(),
    path,
    // eslint-disable-next-line @typescript-eslint/ban-types
    handlers.map((item: Function) => item.name),
  );
};
