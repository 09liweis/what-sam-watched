import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  douban_id:{
    type:String,
    unique:true
  },
  douban_rating:{
    type:Number
  },
  title: {
    type:String
  },
  imdb_id:{
    type:String
  },
  imdb_rating:{
    type:Number
  },
  release_date:{
    type:String
  },
  visual_type:{
    type:String
  },
  poster:{
    type:String
  },
  current_episode:{
    type:Number
  },
  episodes:{
    type:Number
  },
  date_watched:{
    type: Date
  },
  date_updated:{
    type: Date
  }
});

export default mongoose.model('Visual', schema, 'visuals');