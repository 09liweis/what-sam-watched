import {visualModel} from '../model/index';

export default defineEventHandler(async(event)=>{
  const query = getQuery(event);
  const visual = await visualModel.findOne({_id:query.id});
  return {
    visual
  }
});