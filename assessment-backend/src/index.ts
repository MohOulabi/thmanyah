import { buildApp } from '@/app';

async function main() {
  const app = await buildApp();
  const port = Number(app.config.PORT) || 8080;

  try {
    await app.listen({ port, host: '0.0.0.0' });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }

  const shutdown = () => {
    app.log.info('Shutting down...');
    app.close().then(
      () => process.exit(0),
      err => {
        app.log.error(err);
        process.exit(1);
      }
    );
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
