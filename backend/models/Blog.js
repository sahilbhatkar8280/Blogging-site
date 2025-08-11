// // // const mongoose = require('mongoose');
// // // const blogSchema = new mongoose.Schema({
// // //   title: { type: String, required: true },
// // //   content: { type: String, required: true },
// // //   imageUrl: { type: String },
// // //   author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
// // //   published: { type: Boolean, default: true },
// // //   tags: [String]
// // // }, { timestamps: true });
// // // module.exports = mongoose.model('Blog', blogSchema);
// // const mongoose = require("mongoose");

// // const blogSchema = new mongoose.Schema({
// //   title: { type: String, required: true },
// //   slug: { type: String, required: true, unique: true },
// //   content: { type: String, required: true },
// //   imageUrl: { type: String },
// //   author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
// //   createdAt: { type: Date, default: Date.now },
// // });

// // const Blog = mongoose.model("Blog", blogSchema);

// // module.exports = Blog;
// const mongoose = require("mongoose");
// const slugify = require("slugify");

// const blogSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   slug: { type: String, required: true, unique: true },
//   content: { type: String, required: true },
//   imageUrl: { type: String },
//   author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   createdAt: { type: Date, default: Date.now },
// });

// // Pre-validate hook to auto-generate unique slug from title
// blogSchema.pre("validate", async function (next) {
//   if (!this.slug && this.title) {
//     let newSlug = slugify(this.title, { lower: true, strict: true });
//     let slugExists = await mongoose.model("Blog").findOne({ slug: newSlug });
//     let suffix = 1;
//     while (slugExists) {
//       newSlug = slugify(this.title, { lower: true, strict: true }) + "-" + suffix;
//       slugExists = await mongoose.model("Blog").findOne({ slug: newSlug });
//       suffix++;
//     }
//     this.slug = newSlug;
//   }
//   next();
// });

// const Blog = mongoose.model("Blog", blogSchema);
// module.exports = Blog;
const mongoose = require("mongoose");
const slugify = require("slugify");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  imageUrl: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  published: { type: Boolean, default: true }
});

blogSchema.pre("validate", async function (next) {
  if (!this.slug && this.title) {
    let baseSlug = slugify(this.title, { lower: true, strict: true });
    let newSlug = baseSlug;
    let count = 1;
    // Check if slug exists
    while (await mongoose.models.Blog.findOne({ slug: newSlug })) {
      newSlug = `${baseSlug}-${count}`;
      count++;
    }
    this.slug = newSlug;
  }
  next();
});

module.exports = mongoose.model("Blog", blogSchema);
