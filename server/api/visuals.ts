import { visualModel } from "../dbModels";

export default defineEventHandler(async(event)=>{
  const query = {};
  const opts = {limit:20};
  const visuals = await visualModel.find(query,'',opts).sort('-date_updated');
  return {
    visuals
  }
});