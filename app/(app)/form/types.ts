export type DogSex = "macho" | "hembra";

export interface DogInfoData {
  photoFile: File | null;
  photoPreviewUrl: string | null;
  dogName: string;
  breed: string;
  age: string;
  weightKg: string;
  sex: DogSex | "";
  healthStatus: string;
  notes: string;
}

export type LimbSide = "izquierda" | "derecha";
export type LimbPosition = "delantera" | "trasera";

export interface LimbData {
  side: LimbSide | "";
  position: LimbPosition | "";
  stumpLengthCm: string;
  distalCircumferenceCm: string;
  proximalCircumferenceCm: string;
}

export interface ProtesisFormData {
  dogInfo: DogInfoData;
  limb: LimbData;
}