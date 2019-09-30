import cli from "../cli";

(async () => {
  const args = process.argv;

  await cli.run(args);
})();
