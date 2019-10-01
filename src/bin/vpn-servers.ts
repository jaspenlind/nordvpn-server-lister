import cli from "../lib/cli";

(async () => {
  const args = process.argv;

  await cli.run(args.slice(2));
})();
