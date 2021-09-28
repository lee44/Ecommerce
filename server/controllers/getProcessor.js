import Processor from "../models/processor.js";

export const getProcessor = async (req, res) => {
	try {
		const processors = await Processor.find();
		res.status(200).json(processors);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getProcessorQuery = async (req, res) => {
	try {
		const { search, limit } = req.query;

		const processors = await Processor.find({ name: search });
		processors[0].image = "";
		res.status(200).json(processors);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
