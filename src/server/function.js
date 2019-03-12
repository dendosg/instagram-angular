// Load Db
const db = require('./db')

const insert_user = user => {
    db.insta_user.findAndModify({
        query: { _id: user._id },
        update: { $set: user },
        upsert: true,
        new: true
    }, (err, docs) => {
        if (err) {
            console.log('modify_err loi cmnr')
            return
        }
        console.log('Modified', docs.username)
    })
}

const insert_comment = comment => {
    db.insta_user.findAndModify({
        query: { _id: comment.fromId },
        update: { $push: { comments: comment } },
        upsert: true,
        new: true
    }, (err, docs) => {
        if (err) {
            console.log('insert_comment fail')
            return
        }
        console.log('Inserted comment', docs._id)
    })
}
const show_database = () => {
    db.insta_user.find({}, (err, docs) => {
        if (err) throw new Error('Co loi xay cmnr' + err)
        console.log(docs[docs.length - 1])
    })
}
module.exports = {
    insert_user,
    insert_comment,
    show_database
}