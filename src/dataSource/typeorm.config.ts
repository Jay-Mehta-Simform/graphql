import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: 'test.db',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: true,
};

const dataSource = new DataSource(dataSourceOptions);
(async () => {
  await dataSource.initialize();
})();
export default dataSource;
