import { visualModel } from "../dbModels";

export default defineEventHandler(async(event)=>{
  const visuals = await visualModel.find();
  return {
    visuals
  }
});