'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const slug = require('slug')

class Receta extends Model {

    static get objectIDs() {

        return [ '_id', 'category_id' ]
    }

    static boot() {

       super.boot()

       this.addHook('beforeSave', async (document) => {

            if (!document.dirty.deleted_at) {
                document.deleted_at = null
            }

            if(!document.dirty.status || document.dirty.status === false) {
                document.status = false
            }
            else {
                document.status = true
            }

            document.slug = slug(document.title, {
                lower: true
            })
       })
   }

   category() {

       return this.hasOne('App/Models/Cms/RecetaCategory', 'category_id', '_id')
   }
}

module.exports = Receta
