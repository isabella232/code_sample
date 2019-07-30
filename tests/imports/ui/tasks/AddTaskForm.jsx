import React, { useState, useContext } from 'react';
import { Context } from "../pages/TasksPage"

export default () => {
    const initalValue = ''
    const [value, setValue] = useState(initalValue)
    const [lastUpdate, setLastUpdate] = useContext(Context)

    const createTask = (event) => {
        event.preventDefault()
        const doc = {
            title: value
        }
        if (value !== '') {
            Meteor.call(`tasks.create`, doc, (err, res) => {
                if (!err) {
                    setValue(initalValue)
                    setLastUpdate(res)
                } else {
                    console.error(err)
                }
            });
        }
    }

    return (
        <form className="add-task" noValidate="" onSubmit={createTask}>
            <div>
                <div className="fieldset add-task-input fieldset-stripped">
                    <div className="fieldset-content">
                        <label className="fieldset-label">
                            <span className="fieldset-label-content has-icon">
                                <i className="icon-plus" />
                            </span>
                            <input
                                className=""
                                name="title"
                                placeholder="Add new task"
                                type="text"
                                autoComplete="off"
                                value={value}
                                onChange={event => setValue(event.target.value)}
                            />
                        </label>
                    </div>
                </div>
            </div>
        </form>
    )

}