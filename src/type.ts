export type CheckInfo = {
  isUpdate: boolean;
  lastVer: string;
};

export interface Config {
  tempDir: string;
  templateDir: string;
  repoUrls: { [key: string]: string };
  repoName: { [key: string]: string };
  tpType: string[];
}
