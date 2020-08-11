const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  content: { type: String, minlength: 1 },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }
})

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

module.exports = mongoose.model('Comment', commentSchema)