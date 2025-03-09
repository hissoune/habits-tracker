import { Challenge } from "../schemas/chalenge.schema";
import { Progress } from "../schemas/progress.schema";



export interface progressService {

    createProgress(userId:string,chalengeId:string):Promise<Progress>;
    getProgressForChalenge(userId:string,chalengeId:string):Promise<Progress>;
    completeProgress(id:string,userId:string):Promise<Progress>;
    updateProgress(userId:string,chalengeId:string):Promise<Challenge>
}