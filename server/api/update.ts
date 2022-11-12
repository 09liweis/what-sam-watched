import {visualModel} from '../model/index';

export default defineEventHandler(async(event)=>{
  const query = getQuery(event);
  await visualModel.updateOne({_id:query.id},{$inc:{current_episode:1}});
  return {}
});