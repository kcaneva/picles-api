import { Injectable } from "@nestjs/common";
import * as fs from 'fs';
import IFileService from "./interfaces/file.services.interface";

@Injectable()
export class FileService implements IFileService {
    async readFileInBase64(path: string): Promise<string> {

        if(!this.fileExists(path)) {
          return null
        }
    
        return fs.readFileSync(path).toString('base64');   
      }
    
      private fileExists(path: string): boolean {
        return fs.existsSync(path)
    }
}