import mongoose, { Schema, Document, Model ,Types} from "mongoose";

// Interface for the Garage model
export interface IGarage extends Document {
    _id:Types.ObjectId;
    mispar_mosah: number;
    shem_mosah: string;
    cod_sug_mosah: number;
    sug_mosah: string;
    ktovet: string;
    yishuv: string;
    telephone: string;
    mikud: number;
    miktzoa: string;
    menahel_miktzoa: string;
    rasham_havarot: number;
    TESTIME: string;
}
/**
 * custom Model interface extends the generic Mongoose Model,
 */
interface IGarageModel extends Model<IGarage> {}

// Define the Garage schema
const GarageSchema = new Schema(
    {
        _id:{type :Types.ObjectId,  required: true},
        mispar_mosah:{type :Number,  required: true},
        shem_mosah: {type :String,  required: true},
        cod_sug_mosah: {type :Number,  required: true},
        sug_mosah: {type :String,  required: true},
        ktovet: {type :String,  required: true},
        yishuv: {type :String,  required: true},
        telephone: {type :String,  required: true},
        mikud: {type :Number,  required: true},
        miktzoa: {type :String,  required: true},
        menahel_miktzoa:{type :String,  required: true},
        rasham_havarot: {type :Number,  required: true},
        TESTIME:{type: String}
    },
    {
        timestamps: true,
    }
);

/**
 *  create the Garage model using mongoose. Model, providing our Igarage interface
 * and IGarageModel so TypeScript knows about the fields and methods.
 */
const Garage:IGarageModel = mongoose.model<IGarage, IGarageModel>("Garage", GarageSchema);

export default Garage;
