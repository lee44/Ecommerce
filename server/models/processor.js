import mongoose from 'mongoose'

const processorSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name must be provided'],
    },
    cores: {
        type: Number,
        required: [true, 'cores must be provided'],
    },
    base_clock: {
        type: Number,
        required: [true, 'base_clock must be provided'],
    },
    boost_clock: {
        type: Number,
        required: [true, 'base_clock must be provided'],
    },
    l3_cache: {
        type: Number,
        required: [true, 'l3_cache must be provided'],
    },
    tdp: {
        type: Number,
        required: [true, 'tdp must be provided'],
    },
    condition: {
        type: String,
        enum: ['New','Good','Used'],
    },
    price: {
        type: Number,
        required: [true, 'price must be provided'],
    },
    integrated_graphics: {
        type: String,
        enum: ['Yes','No'],
    },
    reviews: {
        type: Number,
        required: [true, 'reviews must be provided'],
    },
    stars: {
        type: Number,
        required: [true, 'stars must be provided'],
    },
    release_date: {
        type: Date,
        required: [true, 'release_date must be provided'],
    },
    image:{
        type: String,
        required: [true, 'image must be provided']
    }
})

const Processor = mongoose.model('Processor', processorSchema);

export default Processor;