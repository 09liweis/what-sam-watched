export default defineEventHandler((event)=>{
  console.log(event.req.statusCode);
  return {
    api: 'visuals'
  }
});