import {visualModel} from '../model/index';

export default defineEventHandler(async(event)=>{
  const body = await useBody(event);
  if (!body.douban_id) {
    return {msg:'No douban id'};
  }
  const visualSummary = await $fetch(process.env.FETCH_VISUAL, {
    method: 'POST',
    body
  });
  const {douban_id,douban_rating,poster,imdb_id,imdb_rating,visual_type,title,episodes} = visualSummary;
  const update = {
    _id:body._id,
    douban_id,
    douban_rating,
    title,
    imdb_id,
    imdb_rating,
    poster,
    episodes,
    visual_type,
    date_updated:new Date(),
    date_watched:new Date()
  }
  if (update._id) {
    delete update.date_watched;
  }
  const filter = {douban_id:update.douban_id};
  const doc = await visualModel.findOneAndUpdate(filter, update, { new: true, upsert: true });
  return doc;
});