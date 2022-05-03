const { Thought, User } = require('../models');

// Controller to find all thoughts and return them in JSON
const thoughtController = {
    getAllThoughts(req, res) {
        // Thought is the model used, Find is a method provided by Mongoose
        Thought.find({})
        // Omit document version since it's not useful to the user
            .select('-__v')
            // Take returned data and JSONise it, then send it as the result
            .then(dbThoughtData => res.json(dbThoughtData))
            // If this fails for whatever reason, send error 400, which stands for bad request.
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    getThoughtById({ params }, res) {
        // FindOne returns a single document from the MongoDB database. params.thoughtId is fished from the URL header.
        Thought.findOne({ _id: params.thoughtId })
            .select('-__v')
            .then((dbThoughtData) => {
                // If the search didn't return anything, then the search query was faulty, therefore a 404 not found is appropriate.
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thoughts found with this ID!' })
                    // After sending 404, we will stop excecuting this method by returning.
                    return;
                }
                // If the return didn't launch, then we will JSONify the response.
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    createThought({ body }, res) {
        // Create is the Mongoose method for creating a new document in the database
        Thought.create(body)
        // We want the ID of the newly created thought so that we can assign it to a user
            .then(({ _id }) => {
                // We take the userId from the request body and use it to match the thought to a user.
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    // MongoDB supports arrays, so we can use the $push method to push the new thought ID into the thoughts-array of the user
                    { $push: { thoughts: _id } },
                    // In the end, we want the response to show the new document, this does that.
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    // If user was not found, the thought cannot be assigned. Therefore a 404 is appopriate to stop executing the request.
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            });
    },

    updateThought({ params, body }, res) {
        // This will find a record and update it. We want to fish the thoughtId from the URL, because this indicates which thought is being updated. 
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id! ' })
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.json(err))
    },

    deleteThought({ params }, res) {
        // This works almost exactly like the previous action, but this deletes the document.
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err))
    },

    addReaction({ params, body }, res) {
        // Find a thought using the thought ID in place of :thoughtId and then push the reaction to that thoughts array.
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err))
    },

    removeReaction({ params }, res) {
        // Finds the reaction using the thoughtId and reactionId, then deletes it
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    }
}

module.exports = thoughtController;