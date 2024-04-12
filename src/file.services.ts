import { Injectable } from "@nestjs/common";
import * as fs from 'fs';
import IFileService from "./interfaces/file.services.interface";

@Injectable()
export class FileService implements IFileService {
    async readFile(path: string): Promise<Buffer> {
        return fs.readFileSync(path)
    }
}