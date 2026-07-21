export interface StudentRegistration {
  id?: string;
  fullName: string;
  grade: string;
  phone: string;
  parentPhone: string;
  school: string;
  governorate: string;
  city: string;
  address: string;
  notes?: string;
  createdAt: string;
  status: "new";
}

export interface GovernorateOption {
  id: string;
  nameAr: string;
  cities: string[];
}
