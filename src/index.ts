// code may go here and in other files also if wanted

function main(): Promise<void> {
  // TODO: this code may be removed
  console.log("TODO: start server on port 9898");
  return new Promise((resolve) => setTimeout(resolve, 9_000_000));
}

if (require.main === module) {
  main().catch(console.error);
}
