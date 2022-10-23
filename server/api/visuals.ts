console.log('test visuals api');
import {visualModel} from '../model/index';

export default defineEventHandler(async(event)=>{
  const query = {};
  const opts = {limit:20};
  const visuals = await visualModel.find(query,'',opts).sort('-date_updated');
  return {
    visuals
  }
});