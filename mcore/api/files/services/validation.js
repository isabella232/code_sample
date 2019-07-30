import { check } from 'meteor/check'
// import { main as MainSchema } from '../schemas'

class ValidationServices {
    static upsert = () => {
        // MainSchema.validator({
        //     clean: true
        // })
    }

    static remove = (id) => {
        check(id, String)
    }

    static staticList({ query = {}, params = {} }) {
        check(query, Object)
        check(params, Object)
    }

    static list = (query = {}, params = {}) => {
        check(query, Object)
        check(params, Object)
    }
}

export default ValidationServices
