import React, { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClassContext } from "../../context/ClassContext";
import { SectionContext } from "../../context/SectionContext";
import { CategoryContext } from "../../context/CategoryContext";
import { HouseContext } from "../../context/HouseContext";
import { SessionContext } from "../../context/SessionContext";

import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";

export const StudentAdmissionComp = () => {
  // Utils
  const [loader, setLoader] = useState(false);
  const { session } = useContext(SessionContext);
  const [residencyStat, setResidencyStat] = useState("Local");
  const { classInfo } = useContext(ClassContext);
  const { sectionInfo } = useContext(SectionContext);
  const { categoryInfo } = useContext(CategoryContext);
  const { houseInfo } = useContext(HouseContext);
  const [activeSchool, setActiveSchool] = useState(1);
  const toastTL = useRef(null);

  const navigate = useNavigate();
  // Apllicant Perticular States

  const [studentID, setStudentID] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [studentSection, setStudentSection] = useState("");
  const [studentCategory, setStudentCategory] = useState("");
  const [studentFirstName, setStudentFirstname] = useState("");
  const [studentLastName, setStudentLastname] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [nationality, setNationality] = useState("Bangladeshi");
  const [religion, setReligion] = useState("");
  const [birthCertificate, setBirthCertificate] = useState("");
  const [passportNo, setPassportNo] = useState("");
  const [house, setHouse] = useState("");
  const [studentImage, setStudentImage] = useState("");

  //   Academic Background States

  const [currentSchoolName, setCurrentSchoolName] = useState("");
  const [currentSchoolStartDate, setCurrentSchoolStartDate] = useState("");
  const [currentSchoolStartGrade, setCurrentSchoolStartGrade] = useState("");
  const [currentSchoolEndDate, setCurrentSchoolEndDate] = useState("");
  const [currentSchoolEndGrade, setCurrentSchoolEndGrade] = useState("");
  const [currentSchoolInstruction, setCurrentSchoolInstruction] = useState("");

  // Previous School 1

  const [previousSchoolName1, setPreviousSchoolName1] = useState("");
  const [previousSchoolStartDate1, setPreviousSchoolStartDate1] = useState("");
  const [previousSchoolStartGrade1, setPreviousSchoolStartGrade1] =
    useState("");
  const [previousSchoolEndDate1, setPreviousSchoolEndDate1] = useState("");
  const [previousSchoolEndGrade1, setPreviousSchoolEndGrade1] = useState("");
  const [previousSchoolInstruction1, setPreviousSchoolInstruction1] =
    useState("");

  // Previous School 2

  const [previousSchoolName2, setPreviousSchoolName2] = useState("");
  const [previousSchoolStartDate2, setPreviousSchoolStartDate2] = useState("");
  const [previousSchoolStartGrade2, setPreviousSchoolStartGrade2] =
    useState("");
  const [previousSchoolEndDate2, setPreviousSchoolEndDate2] = useState("");
  const [previousSchoolEndGrade2, setPreviousSchoolEndGrade2] = useState("");
  const [previousSchoolInstruction2, setPreviousSchoolInstruction2] =
    useState("");

  // Previous School 3

  const [previousSchoolName3, setPreviousSchoolName3] = useState("");
  const [previousSchoolStartDate3, setPreviousSchoolStartDate3] = useState("");
  const [previousSchoolStartGrade3, setPreviousSchoolStartGrade3] =
    useState("");
  const [previousSchoolEndDate3, setPreviousSchoolEndDate3] = useState("");
  const [previousSchoolEndGrade3, setPreviousSchoolEndGrade3] = useState("");
  const [previousSchoolInstruction3, setPreviousSchoolInstruction3] =
    useState("");

  // Medical Condition States

  const [physicalDisability, setPhysicalDisability] = useState("No");
  const [partiallySighted, setPartiallySighted] = useState("No");
  const [hearingImpairment, setHearingImpairment] = useState("No");
  const [mobilityDifficulties, setMobilityDifficulties] = useState("No");
  const [mentalDisability, setMentalDisability] = useState("No");
  const [bloodGroup, setBloodGroup] = useState("");
  const [otherConditions, setOtherConditions] = useState("");
  const [medRemarks, setMedRemarks] = useState("");

  //   Parent's & Gaurdian's Particulars States

  const [fatherName, setFatherName] = useState("");
  const [fatherJob, setFatherJob] = useState("");
  const [fatherEdu, setFatherEdu] = useState("");
  const [fatherNID, setFatherNID] = useState("");
  const [fatherTIN, setFatherTIN] = useState("");

  const [motherName, setMotherName] = useState("");
  const [motherJob, setMotherJob] = useState("");
  const [motherEdu, setMotherEdu] = useState("");
  const [motherNID, setMotherNID] = useState("");
  const [motherTIN, setMotherTIN] = useState("");

  const [guardianName1, setGuardianName1] = useState("");
  const [guardianRelation1, setGuardianRelation1] = useState("");
  const [guardianName2, setGuardianName2] = useState("");
  const [guardianRelation2, setGuardianRelation2] = useState("");

  const [siblingInfo, setSiblingInfo] = useState("");

  const [fatherImage, setFatherImage] = useState("");
  const [motherImage, setMotherImage] = useState("");
  const [guardian1Image, setGuardian1Image] = useState("");
  const [guardian2Image, setGuardian2Image] = useState("");

  //   Address States

  // Foreign

  const [presentAddress, setPresentAddress] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");

  // Local

  const [presentDistrictLocal, setPresentDistrictLocal] =
    useState("Chittagong");
  const [presentCityLocal, setPresentCityLocal] = useState("Chittagong");
  const [presentStreetLocal, setPresentStreetLocal] = useState("");

  const [permanentDistrictLocal, setPermanentDistrictLocal] =
    useState("Chittagong");
  const [permanentCityLocal, setPermanentCityLocal] = useState("Chittagong");
  const [permanentStreetLocal, setPermanentStreetLocal] = useState("");

  // Contact States

  const [fatherContact, setFatherContact] = useState("");
  const [fatherEmail, setFatherEmail] = useState("");
  const [motherContact, setMotherContact] = useState("");
  const [motherEmail, setMotherEmail] = useState("");

  const [emergencyCon1, setEmergencyCon1] = useState("");
  const [emergencyRel1, setEmergencyRel1] = useState("");
  const [emergencySMS1, setEmergencySMS1] = useState("");

  const [emergencyCon2, setEmergencyCon2] = useState("");
  const [emergencyRel2, setEmergencyRel2] = useState("");
  const [emergencySMS2, setEmergencySMS2] = useState("");

  //   Payment States

  const [feePayer, setFeePayer] = useState("");
  const [feePayerRelation, setFeePayerRelation] = useState("");
  const [employeeStatus, setEmployeeStatus] = useState("No");
  const [employeeDesignation, setEmployeeDesignation] = useState("");

  //   Sibling States

  const [sibling1, setSibling1] = useState("");
  const [sibling2, setSibling2] = useState("");
  const [sibling3, setSibling3] = useState("");

  //   Additional Notes States

  const [additionalNotes, setAddiotionalNotes] = useState("");

  // Admin States

  const [dateOfAdmission, setDateOfAdmission] = useState("");
  const [adminNotes, setAdminNotes] = useState("");

  const [tc, setTC] = useState(false);
  const [reportCard, setReportCard] = useState(false);
  const [birthCertiReceived, setBirthCertiReceived] = useState(false);
  const [photo4pp, setPhoto4pp] = useState(false);

  // Accounts States
  /* 
  const [depositReceived, setDepositReceived] = useState("No");
  const [accountsChecked, setAccountsChecked] = useState("No");

  const [financialAid, setFinancialAid] = useState("");
  const [financialNote, setFinancialNote] = useState(""); */

  // Financial Aid States

  const [financialAidType, setFinancialAidType] = useState("");
  const [financialAidTypeOthers, setFinancialAidTypeOthers] = useState("");

  const [applicableAidAdmission, setApplicableAidAdmission] = useState(false);
  const [applicableAidTuition, setApplicableAidTuition] = useState(false);
  const [applicableAidAnnual, setApplicableAidAnnual] = useState(false);
  const [applicableAidOneTime, setApplicableAidOneTime] = useState(false);

  const [discountTypeAdmission, setDiscountTypeAdmission] = useState(false);
  const [discountAmountAdmission, setDiscountAmountAdmission] = useState(0);

  const [discountTypeTuition, setDiscountTypeTuition] = useState(false);
  const [discountAmountTuition, setDiscountAmountTuition] = useState(0);

  const [discountTypeAnnual, setDiscountTypeAnnual] = useState(false);
  const [discountAmountAnnual, setDiscountAmountAnnual] = useState(0);

  const [discountTypeOneTime, setDiscountTypeOneTime] = useState(false);
  const [discountAmountOneTime, setDiscountAmountOneTime] = useState(0);

  // Documents States

  const [tcImage, setTcImage] = useState("");
  const [birthCertificateImage, setBirthCertificateImage] = useState("");
  const [reportImage, setReportImage] = useState("");
  const [othersImage, setOthersImage] = useState("");

  // Global Data

  const [admittedStudentsData, setAdmittedStudentsData] = useState([]);
  const [eligibleStudentsData, setEligibleStudentsData] = useState([]);

  const [confirmationState, setConfirmationState] = useState(false);

  // Conditions

  const conditions = [
    studentID === "",
    studentFirstName === "",
    studentLastName === "",
    studentClass === "",
    studentSection === "",
    studentCategory === "",
    dateOfBirth === "",
    age === "",
    gender === "",
    placeOfBirth === "",
    nationality === "",
    religion === "",
    birthCertificate === "",
    passportNo === "",
    house === "",
    studentImage === "",
  ];

  const [selectID, setSelectID] = useState("");

  const fieldNames = [
    "Student ID",
    "First Name",
    "Last Name",
    "Class",
    "Section",
    "Category",
    "Date of Birth",
    "Age",
    "Gender",
    "Place of Birth",
    "Nationality",
    "Religion",
    "Birth Certificate",
    "Passport No",
    "House",
    "Student Image",
  ];

  // Divisions

  const divisions = [
    { id: 1, value: "Barisal", label: "Barisal" },
    { id: 2, value: "Chattogram", label: "Chattogram" },
    { id: 3, value: "Dhaka", label: "Dhaka" },
    { id: 4, value: "Khulna", label: "Khulna" },
    { id: 5, value: "Mymensingh", label: "Mymensingh" },
    { id: 6, value: "Rajshahi", label: "Rajshahi" },
    { id: 7, value: "Rangpur", label: "Rangpur" },
    { id: 8, value: "Sylhet", label: "Sylhet" },
  ];

  const districts = [
    {
      id: 1,
      value: "Barisal",
      label: "Barisal",
      division: "Barisal",
      divisionID: 1,
    },
    {
      id: 2,
      value: "Barguna",
      label: "Barguna",
      division: "Barisal",
      divisionID: 1,
    },
    {
      id: 3,
      value: "Bhola",
      label: "Bhola",
      division: "Barisal",
      divisionID: 1,
    },
    {
      id: 4,
      value: "Jhalokati",
      label: "Jhalokati",
      division: "Barisal",
      divisionID: 1,
    },
    {
      id: 5,
      value: "Patuakhali",
      label: "Patuakhali",
      division: "Barisal",
      divisionID: 1,
    },
    {
      id: 6,
      value: "Pirojpur",
      label: "Pirojpur",
      division: "Barisal",
      divisionID: 1,
    },
    {
      id: 7,
      value: "Chattogram",
      label: "Chattogram",
      division: "Chattogram",
      divisionID: 2,
    },
    {
      id: 8,
      value: "Bandarban",
      label: "Bandarban",
      division: "Chattogram",
      divisionID: 2,
    },
    {
      id: 9,
      value: "Brahmanbaria",
      label: "Brahmanbaria",
      division: "Chattogram",
      divisionID: 2,
    },
    {
      id: 10,
      value: "Chandpur",
      label: "Chandpur",
      division: "Chattogram",
      divisionID: 2,
    },
    {
      id: 11,
      value: "Cumilla",
      label: "Cumilla",
      division: "Chattogram",
      divisionID: 2,
    },
    {
      id: 12,
      value: "Cox's Bazar",
      label: "Cox's Bazar",
      division: "Chattogram",
      divisionID: 2,
    },
    {
      id: 13,
      value: "Feni",
      label: "Feni",
      division: "Chattogram",
      divisionID: 2,
    },
    {
      id: 14,
      value: "Khagrachhari",
      label: "Khagrachhari",
      division: "Chattogram",
      divisionID: 2,
    },
    {
      id: 15,
      value: "Lakshmipur",
      label: "Lakshmipur",
      division: "Chattogram",
      divisionID: 2,
    },
    {
      id: 16,
      value: "Noakhali",
      label: "Noakhali",
      division: "Chattogram",
      divisionID: 2,
    },
    {
      id: 17,
      value: "Rangamati",
      label: "Rangamati",
      division: "Chattogram",
      divisionID: 2,
    },
    {
      id: 18,
      value: "Dhaka",
      label: "Dhaka",
      division: "Dhaka",
      divisionID: 3,
    },
    {
      id: 19,
      value: "Faridpur",
      label: "Faridpur",
      division: "Dhaka",
      divisionID: 3,
    },
    {
      id: 20,
      value: "Gazipur",
      label: "Gazipur",
      division: "Dhaka",
      divisionID: 3,
    },
    {
      id: 21,
      value: "Gopalganj",
      label: "Gopalganj",
      division: "Dhaka",
      divisionID: 3,
    },
    {
      id: 22,
      value: "Kishoreganj",
      label: "Kishoreganj",
      division: "Dhaka",
      divisionID: 3,
    },
    {
      id: 23,
      value: "Madaripur",
      label: "Madaripur",
      division: "Dhaka",
      divisionID: 3,
    },
    {
      id: 24,
      value: "Manikganj",
      label: "Manikganj",
      division: "Dhaka",
      divisionID: 3,
    },
    {
      id: 25,
      value: "Munshiganj",
      label: "Munshiganj",
      division: "Dhaka",
      divisionID: 3,
    },
    {
      id: 26,
      value: "Narayanganj",
      label: "Narayanganj",
      division: "Dhaka",
      divisionID: 3,
    },
    {
      id: 27,
      value: "Narsingdi",
      label: "Narsingdi",
      division: "Dhaka",
      divisionID: 3,
    },
    {
      id: 28,
      value: "Rajbari",
      label: "Rajbari",
      division: "Dhaka",
      divisionID: 3,
    },
    {
      id: 29,
      value: "Shariatpur",
      label: "Shariatpur",
      division: "Dhaka",
      divisionID: 3,
    },
    {
      id: 30,
      value: "Sherpur",
      label: "Sherpur",
      division: "Dhaka",
      divisionID: 3,
    },
    {
      id: 31,
      value: "Tangail",
      label: "Tangail",
      division: "Dhaka",
      divisionID: 3,
    },
    {
      id: 32,
      value: "Bagerhat",
      label: "Bagerhat",
      division: "Khulna",
      divisionID: 4,
    },
    {
      id: 33,
      value: "Chuadanga",
      label: "Chuadanga",
      division: "Khulna",
      divisionID: 4,
    },
    {
      id: 34,
      value: "Jessore",
      label: "Jessore",
      division: "Khulna",
      divisionID: 4,
    },
    {
      id: 35,
      value: "Jhenaidah",
      label: "Jhenaidah",
      division: "Khulna",
      divisionID: 4,
    },
    {
      id: 36,
      value: "Khulna",
      label: "Khulna",
      division: "Khulna",
      divisionID: 4,
    },
    {
      id: 37,
      value: "Kushtia",
      label: "Kushtia",
      division: "Khulna",
      divisionID: 4,
    },
    {
      id: 38,
      value: "Magura",
      label: "Magura",
      division: "Khulna",
      divisionID: 4,
    },
    {
      id: 39,
      value: "Meherpur",
      label: "Meherpur",
      division: "Khulna",
      divisionID: 4,
    },
    {
      id: 40,
      value: "Narail",
      label: "Narail",
      division: "Khulna",
      divisionID: 4,
    },
    {
      id: 41,
      value: "Satkhira",
      label: "Satkhira",
      division: "Khulna",
      divisionID: 4,
    },
    {
      id: 42,
      value: "Jamalpur",
      label: "Jamalpur",
      division: "Mymensingh",
      divisionID: 5,
    },
    {
      id: 43,
      value: "Mymensingh",
      label: "Mymensingh",
      division: "Mymensingh",
      divisionID: 5,
    },
    {
      id: 44,
      value: "Netrokona",
      label: "Netrokona",
      division: "Mymensingh",
      divisionID: 5,
    },
    {
      id: 45,
      value: "Sherpur",
      label: "Sherpur",
      division: "Mymensingh",
      divisionID: 5,
    },
    {
      id: 46,
      value: "Bogra",
      label: "Bogra",
      division: "Rajshahi",
      divisionID: 6,
    },
    {
      id: 47,
      value: "Joypurhat",
      label: "Joypurhat",
      division: "Rajshahi",
      divisionID: 6,
    },
    {
      id: 48,
      value: "Naogaon",
      label: "Naogaon",
      division: "Rajshahi",
      divisionID: 6,
    },
    {
      id: 49,
      value: "Natore",
      label: "Natore",
      division: "Rajshahi",
      divisionID: 6,
    },
    {
      id: 50,
      value: "Chapainawabganj",
      label: "Chapainawabganj",
      division: "Rajshahi",
      divisionID: 6,
    },
    {
      id: 51,
      value: "Pabna",
      label: "Pabna",
      division: "Rajshahi",
      divisionID: 6,
    },
    {
      id: 52,
      value: "Rajshahi",
      label: "Rajshahi",
      division: "Rajshahi",
      divisionID: 6,
    },
    {
      id: 53,
      value: "Sirajganj",
      label: "Sirajganj",
      division: "Rajshahi",
      divisionID: 6,
    },
    {
      id: 54,
      value: "Dinajpur",
      label: "Dinajpur",
      division: "Rangpur",
      divisionID: 7,
    },
    {
      id: 55,
      value: "Gaibandha",
      label: "Gaibandha",
      division: "Rangpur",
      divisionID: 7,
    },
    {
      id: 56,
      value: "Kurigram",
      label: "Kurigram",
      division: "Rangpur",
      divisionID: 7,
    },
    {
      id: 57,
      value: "Lalmonirhat",
      label: "Lalmonirhat",
      division: "Rangpur",
      divisionID: 7,
    },
    {
      id: 58,
      value: "Nilphamari",
      label: "Nilphamari",
      division: "Rangpur",
      divisionID: 7,
    },
    {
      id: 59,
      value: "Panchagarh",
      label: "Panchagarh",
      division: "Rangpur",
      divisionID: 7,
    },
    {
      id: 60,
      value: "Rangpur",
      label: "Rangpur",
      division: "Rangpur",
      divisionID: 7,
    },
    {
      id: 61,
      value: "Thakurgaon",
      label: "Thakurgaon",
      division: "Rangpur",
      divisionID: 7,
    },
    {
      id: 62,
      value: "Habiganj",
      label: "Habiganj",
      division: "Sylhet",
      divisionID: 8,
    },
    {
      id: 63,
      value: "Moulvibazar",
      label: "Moulvibazar",
      division: "Sylhet",
      divisionID: 8,
    },
    {
      id: 64,
      value: "Sunamganj",
      label: "Sunamganj",
      division: "Sylhet",
      divisionID: 8,
    },
    {
      id: 65,
      value: "Sylhet",
      label: "Sylhet",
      division: "Sylhet",
      divisionID: 8,
    },
  ];

  //   Functions

  const calcAge = (dob) => {
    let date = new Date();
    let currentYear = date.getFullYear();
    let currentMonth = date.getMonth() + 1;
    let birthDate = new Date(dob);
    let birthYear = birthDate.getFullYear();
    let birthMonth = birthDate.getMonth() + 1;

    let years = currentYear - birthYear;
    let months = currentMonth - birthMonth;

    if (months < 0) {
      years--;
      months = 12 + months;
    }

    return `${years} years ${months} months`;
  };

  const studentAdmissionSubmitHandler = () => {
    for (let i = 0; i < conditions.length; i++) {
      if (conditions[i]) {
        setLoader(false);
        toastTL.current.show({
          severity: "error",
          summary: "Error",
          detail: `Fill up the ${fieldNames[i]} field!`,
          life: 2000,
        });
        return false;
      }
    }

    const data = new FormData();

    // Apllicant Perticular Data Append

    data.append("student_id", studentID);
    data.append("student_first_name", studentFirstName);
    data.append("student_last_name", studentLastName);
    data.append("Class", studentClass);
    data.append("section", studentSection);
    data.append("category", studentCategory);
    data.append("dob", dateOfBirth);
    data.append("age", age);
    data.append("gender", gender);
    data.append("pob", placeOfBirth);
    data.append("nationality", nationality);
    data.append("religion", religion);
    data.append("birthCertificate", birthCertificate);
    data.append("passnumber", passportNo);
    data.append("house", house);
    data.append("student_picture", studentImage);

    //   Academic Background Data Append

    data.append("current_school", currentSchoolName);
    data.append("csdate", currentSchoolStartDate);
    data.append("cgrade", currentSchoolStartGrade);
    data.append("cfdate", currentSchoolEndDate);
    data.append("cfgrade", currentSchoolEndGrade);
    data.append("clanguage", currentSchoolInstruction);

    data.append("previous_school1", previousSchoolName1);
    data.append("psdate1", previousSchoolStartDate1);
    data.append("psgrade1", previousSchoolStartGrade1);
    data.append("pfdate1", previousSchoolEndDate1);
    data.append("pfgrade1", previousSchoolEndGrade1);
    data.append("planguage1", previousSchoolInstruction1);

    data.append("previous_school2", previousSchoolName2);
    data.append("psdate2", previousSchoolStartDate2);
    data.append("psgrade2", previousSchoolStartGrade2);
    data.append("pfdate2", previousSchoolEndDate2);
    data.append("pfgrade2", previousSchoolEndGrade2);
    data.append("planguage2", previousSchoolInstruction2);

    data.append("previous_school3", previousSchoolName3);
    data.append("psdate3", previousSchoolStartDate3);
    data.append("psgrade3", previousSchoolStartGrade3);
    data.append("pfdate3", previousSchoolEndDate3);
    data.append("pfgrade3", previousSchoolEndGrade3);
    data.append("planguage3", previousSchoolInstruction3);

    // Medical Condition Data Append

    data.append("physical_disability", physicalDisability);
    data.append("partially_signted", partiallySighted);
    data.append("hearing_imparment", hearingImpairment);
    data.append("mobility_difficulties", mobilityDifficulties);
    data.append("mental_health", mentalDisability);
    data.append("blood_group", bloodGroup);
    data.append("other", otherConditions);
    data.append("remarks", medRemarks);

    // Parent's & Gaurdian's Particulars Data append

    data.append("father_name", fatherName);
    data.append("father_occ", fatherJob);
    data.append("father_edu", fatherEdu);
    data.append("father_nid_pass", fatherNID);
    data.append("father_tin", fatherTIN);

    data.append("mother_name", motherName);
    data.append("mother_occ", motherJob);
    data.append("mother_edu", motherEdu);
    data.append("mother_nid_pass", motherNID);
    data.append("mother_tin", motherTIN);

    data.append("sibling_info", siblingInfo);

    data.append("guardian_name1", guardianName1);
    data.append("grealtion1", guardianRelation1);
    data.append("guardian_name2", guardianName2);
    data.append("grealtion2", guardianRelation2);

    data.append("father_img", fatherImage);
    data.append("mother_img", motherImage);
    data.append("guardianimg1", guardian1Image);
    data.append("guardianimg2", guardian2Image);

    // Address Data append

    // Residency

    data.append("residency", residencyStat);

    // Foreign

    data.append("present_address", presentAddress);
    data.append("permanent_address", permanentAddress);

    // Local

    data.append("lpresentdist", presentDistrictLocal);
    data.append("lpresentcity", presentCityLocal);
    data.append("lpresentstreet", presentStreetLocal);
    data.append("lperdist", permanentDistrictLocal);
    data.append("lpercity", permanentCityLocal);
    data.append("lperstreet", permanentStreetLocal);

    // Contact Data Append

    data.append("father_contact", fatherContact);
    data.append("father_email", fatherEmail);
    data.append("mother_contact", motherContact);
    data.append("mother_email", motherEmail);

    data.append("emergency_con1", emergencyCon1);
    data.append("erelation1", emergencyRel1);
    data.append("esms1", emergencySMS1);

    data.append("emergency_con2", emergencyCon2);
    data.append("erelation2", emergencyRel2);
    data.append("esms2", emergencySMS2);

    // Payment Data append

    data.append("whowillpay", feePayer);
    data.append("pay_relation", feePayerRelation);
    data.append("designation", employeeDesignation);

    // Sibling Data append

    data.append("sibling1", sibling1);
    data.append("sibling2", sibling2);
    data.append("sibling3", sibling3);
    data.append("sibling4", "");
    data.append("sibling5", "");

    // Additional Notes Data append

    data.append("note", additionalNotes);

    // Admin States

    data.append("admission_date", dateOfAdmission);
    data.append("admin_note", adminNotes);
    data.append("tc", tc);
    data.append("report", reportCard);
    data.append("adminbirthcertificate", birthCertiReceived);
    data.append("fourpphoto", photo4pp);

    // Accounts States

    /* data.append("deposit_received", depositReceived);
    data.append("account_chk", accountsChecked);

    data.append("financial_aid", financialAid);
    data.append("account_note", financialNote); */

    // Financial Aid

    data.append("financial_aid_type", financialAidType);
    data.append("admission_fee", applicableAidAdmission);
    data.append("tuition_fee", applicableAidTuition);
    data.append("annual_fee", applicableAidAnnual);
    data.append("ot_discount", applicableAidOneTime);

    data.append("admission_discount", discountTypeAdmission);
    data.append("admission_amount", discountAmountAdmission);

    data.append("tuition_discount", discountTypeTuition);
    data.append("tuition_amount", discountAmountTuition);

    data.append("annual_discount", discountTypeAnnual);
    data.append("annual_amount", discountAmountAnnual);

    data.append("ot_discount_type", discountTypeOneTime);
    data.append("ot_amount", discountAmountOneTime);

    // Document States Append

    data.append("tcimg", tcImage);
    data.append("bcimg", birthCertificateImage);
    data.append("report_img", reportImage);
    data.append("other_img", othersImage);
    data.append("session", session);

    fetch(`${import.meta.env.VITE_SERVER}/addstudent`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          toastTL.current.show({
            severity: "success",
            summary: "Success",
            detail: `Student Added!`,
            life: 2000,
          });
          navigate("/studentinfo");
        }
      })
      .catch((err) => console.log(err));
  };

  const addSchoolField = () => {
    if (activeSchool < 3) {
      setActiveSchool(activeSchool + 1);
    }
  };

  const getAdmittedStudentsData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/fetchAdmittedStudents`,
        {
          method: "POST",
        }
      );

      const res = await response.json();

      setAdmittedStudentsData(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  // ANCHOR Get Eligible Data Function

  const getEligibleStudentsData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/fetchApplicants`,
        {
          method: "POST",
        }
      );
      const res = await response.json();
      setEligibleStudentsData(res.message);
    } catch (error) {
      console.error(error);
    }
  };

  const getEligibleStudentDatabyID = async (id) => {
    const data = new FormData();
    data.append("id", id);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/fetchApplicantsbyID`,
        {
          method: "POST",
          body: data,
        }
      );
      const res = await response.json();

      setStudentFirstname(res.message[0].student_first_name);
      setStudentLastname(res.message[0].student_last_name);
      setDateOfBirth(res.message[0].dob);
      setAge(calcAge(res.message[0].dob));
      setGender(res.message[0].gender);
      setStudentClass(res.message[0].applyforclass);
      setPlaceOfBirth(res.message[0].pob);
      setNationality(res.message[0].nationality);
      setReligion(res.message[0].religion);
      setBirthCertificate(res.message[0].birthCertificate);
      setPassportNo(res.message[0].passport_number);
      setStudentImage(res.message[0].student_picture);

      setCurrentSchoolName(res.message[0].currentschool);
      setCurrentSchoolStartDate(res.message[0].sdate);
      setCurrentSchoolStartGrade(res.message[0].sgrade);
      setCurrentSchoolEndDate(res.message[0].fdate);
      setCurrentSchoolEndGrade(res.message[0].fgrade);
      setCurrentSchoolInstruction(res.message[0].language);

      setPreviousSchoolName1(res.message[0].previousSchool);
      setPreviousSchoolStartDate1(res.message[0].psdate);
      setPreviousSchoolStartGrade1(res.message[0].psgrade);
      setPreviousSchoolEndDate1(res.message[0].pfdate);
      setPreviousSchoolEndGrade1(res.message[0].pfgrade);
      setPreviousSchoolInstruction1(res.message[0].planguage);

      setPreviousSchoolName2(res.message[0].previousSchool1);
      setPreviousSchoolStartDate2(res.message[0].psdate1);
      setPreviousSchoolStartGrade2(res.message[0].psgrade1);
      setPreviousSchoolEndDate2(res.message[0].pfdate1);
      setPreviousSchoolEndGrade2(res.message[0].pfgrade1);
      setPreviousSchoolInstruction2(res.message[0].planguage1);

      setPreviousSchoolName3(res.message[0].previousSchool2);
      setPreviousSchoolStartDate3(res.message[0].psdate2);
      setPreviousSchoolStartGrade3(res.message[0].psgrade2);
      setPreviousSchoolEndDate3(res.message[0].pfdate2);
      setPreviousSchoolEndGrade3(res.message[0].pfgrade2);
      setPreviousSchoolInstruction3(res.message[0].planguage2);

      setPhysicalDisability(res.message[0].physical_disability);
      setPartiallySighted(res.message[0].partially_signted);
      setHearingImpairment(res.message[0].hearing_imparment);
      setMobilityDifficulties(res.message[0].mobility_difficulties);
      setMentalDisability(res.message[0].mental_health);
      setBloodGroup(res.message[0].blood_group);
      setOtherConditions(res.message[0].others);
      setMedRemarks(res.message[0].mremarks);

      setFatherName(res.message[0].father_name);
      setFatherJob(res.message[0].father_occupation);
      setFatherEdu(res.message[0].father_education);
      setFatherNID(res.message[0].father_nidPass);
      setFatherTIN(res.message[0].father_tin);

      setMotherName(res.message[0].mother_name);
      setMotherJob(res.message[0].mother_occupation);
      setMotherEdu(res.message[0].mother_education);
      setMotherNID(res.message[0].mother_nidPass);
      setMotherTIN(res.message[0].mother_tin);

      setGuardianName1(res.message[0].guardianName1);
      setGuardianRelation1(res.message[0].grelation1);
      setGuardianName2(res.message[0].guardianName2);
      setGuardianRelation2(res.message[0].grelation2);

      setFatherImage(res.message[0].father_img);
      setMotherImage(res.message[0].mother_img);
      setGuardian1Image(res.message[0].gurdian1_img);
      setGuardian2Image(res.message[0].gurdian2_img);

      setResidencyStat(res.message[0].mremarks);

      setPresentAddress(res.message[0].present_address);
      setPermanentAddress(res.message[0].permanent_address);

      setPresentStreetLocal(res.message[0].presentstreet);
      setPresentDistrictLocal(res.message[0].presentdistrict);
      setPresentCityLocal(res.message[0].presentcity);

      setPermanentStreetLocal(res.message[0].permanentstreet);
      setPermanentDistrictLocal(res.message[0].permanentdistrict);
      setPermanentCityLocal(res.message[0].permanentcity);
      // setPermanentCityLocal(res.message[0].mremarks);

      setFatherContact(res.message[0].father_contact);
      setFatherEmail(res.message[0].father_email);
      setMotherContact(res.message[0].mother_contact);
      setMotherEmail(res.message[0].mother_email);

      setEmergencyCon1(res.message[0].emergency_contact1);
      setEmergencyRel1(res.message[0].relation1);
      setEmergencySMS1(res.message[0].sms_contact1);

      setEmergencyCon2(res.message[0].emergency_contact2);
      setEmergencyRel2(res.message[0].relation2);
      setEmergencySMS2(res.message[0].sms_contact2);

      setFeePayer(res.message[0].who_will_pay);

      setFeePayerRelation(res.message[0].pay_relation);

      setEmployeeStatus(res.message[0].employee_student);

      setSibling1(res.message[0].sibling1);
      setSibling2(res.message[0].sibling2);
      setSibling3(res.message[0].sibling3);

      setAddiotionalNotes(res.message[0].note);

      // ANCHOR Current Work
    } catch (error) {
      console.error(error);
    }
  };

  const selectedSiblingTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <div>
            {option.form_number}, {option.student_first_name}{" "}
            {option.student_last_name}, {option.applyforclass}
          </div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  useEffect(() => {
    getAdmittedStudentsData();
    getEligibleStudentsData();
  }, []);

  return (
    <>
      <div className="content-body">
        <Toast ref={toastTL} position="top-right" />
        <div className="d-flex py-2 px-3 border-b align-items-center">
          <p className="header-font">Student Admission</p>

          {/* ANCHOR Eligible Modal Button */}
          <Link
            className=" ms-4 linkdecoration"
            data-bs-toggle="modal"
            data-bs-target="#eligibleModal"
          >
            <div className="btn1 px-3 py-1">Choose Eligible Student</div>
          </Link>
        </div>

        <div className="scroll-element">
          {/* Student's particular Start */}

          <div className="d-flex bg1 px-3 py-1">
            <p className="text1 mb-0">Applicant's Particulars</p>
          </div>
          <p className="fs-11 px-3 py-1 text-danger">
            *Note: All fields are required in this section. Please check all
            information before submit.{" "}
          </p>
          <div className="container-fluid">
            <div className="row px-1 py-1">
              <div className="col-lg-3 mb-2">
                <label className="form-label label1">Student ID</label>
                <input
                  className="form-control input1"
                  type="text"
                  placeholder=""
                  aria-label="form-control example"
                  onChange={(e) => {
                    setStudentID(e.target.value);
                  }}
                />
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">Class</label>

                <select
                  className="form-select input1 py-0"
                  onChange={(e) => {
                    setStudentClass(e.target.value);
                  }}
                  value={studentClass}
                >
                  <option selected value={""}>
                    Select Class
                  </option>
                  {classInfo
                    .filter((item) => {
                      return item.session === session && +item.pstatus === 1;
                    })
                    .map((item) => (
                      <option key={item.id} value={item.class_name}>
                        {item.class_name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">Section</label>

                <select
                  className="form-select input1 py-0"
                  onChange={(e) => {
                    setStudentSection(e.target.value);
                  }}
                >
                  <option selected value={""}>
                    Select Section
                  </option>
                  {sectionInfo
                    .filter((item) => {
                      return item.class_name === studentClass;
                    })
                    .map((item) => (
                      <option key={item.id} value={item.section_name}>
                        {item.section_name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">Category</label>

                <select
                  className="form-select input1 py-0"
                  onChange={(e) => {
                    setStudentCategory(e.target.value);
                  }}
                >
                  <option selected value={""}>
                    Select Category
                  </option>
                  {categoryInfo
                    .filter((item) => {
                      return +item.pstatus === 1;
                    })
                    .map((item) => (
                      <option key={item.id} value={item.category_name}>
                        {item.category_name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">Student First Name</label>
                <input
                  type="text"
                  className="form-control input1"
                  onChange={(e) => {
                    setStudentFirstname(e.target.value);
                  }}
                  value={studentFirstName}
                />
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">Student Last Name</label>
                <input
                  type="text"
                  className="form-control input1"
                  onChange={(e) => {
                    setStudentLastname(e.target.value);
                  }}
                  value={studentLastName}
                />
              </div>
              <div className="col-lg-3 mb-2">
                <label className="form-label label1">Date of Birth</label>
                <input
                  type="date"
                  className="form-control input1"
                  onChange={(e) => {
                    setDateOfBirth(e.target.value);
                    setAge(calcAge(dateOfBirth));
                  }}
                  value={dateOfBirth}
                />
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">Age (years)</label>
                <input
                  className="form-control input1"
                  type="text"
                  aria-label="form-control example"
                  disabled
                  value={age}
                />
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">Gender</label>
                <select
                  className="form-select input1 py-0"
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                  value={gender}
                >
                  <option selected value={""}>
                    Select
                  </option>
                  <option value={"Male"}>Male</option>
                  <option value={"Female"}>Female</option>
                </select>
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">Place of Birth</label>
                <input
                  className="form-control input1"
                  type="text"
                  placeholder=""
                  aria-label="form-control example"
                  onChange={(e) => {
                    setPlaceOfBirth(e.target.value);
                  }}
                  value={placeOfBirth}
                />
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">Nationality</label>
                <input
                  className="form-control input1"
                  type="text"
                  placeholder=""
                  aria-label="form-control example"
                  value={nationality}
                  onChange={(e) => {
                    setNationality(e.target.value);
                  }}
                />
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">Religion</label>
                <select
                  className="form-select input1 py-0"
                  onChange={(e) => {
                    setReligion(e.target.value);
                  }}
                  defaultValue={religion}
                >
                  <option value={"Islam"}>Islam</option>
                  <option value={"Hinduism"}>Hinduism</option>
                  <option value={"Buddhism"}>Buddhism</option>
                  <option value={"Christianity"}>Christianity</option>
                </select>
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">Birth Certificate</label>
                <input
                  className="form-control input1"
                  type="text"
                  placeholder=""
                  aria-label="form-control example"
                  onChange={(e) => {
                    setBirthCertificate(e.target.value);
                  }}
                  value={birthCertificate}
                />
              </div>
              <div className="col-lg-3 mb-2">
                <label className="form-label label1">Passport Number</label>
                <input
                  className="form-control input1"
                  type="text"
                  placeholder=""
                  aria-label="form-control example"
                  onChange={(e) => {
                    setPassportNo(e.target.value);
                  }}
                  value={passportNo}
                />
              </div>
              <div className="col-lg-3 mb-2">
                <label className="form-label label1">House</label>

                <select
                  className="form-select input1 py-0"
                  onChange={(e) => {
                    setHouse(e.target.value);
                  }}
                >
                  <option selected value={""}>
                    Select House
                  </option>
                  {houseInfo.map((item) => (
                    <option key={item.id} value={item.housename}>
                      {item.housename}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">Student's Image</label>
                {!studentImage && (
                  <input
                    className="form-control input1 pt-1"
                    type="file"
                    placeholder=""
                    aria-label="form-control example"
                    accept="image/png,image/jpg,image/png,image/JPEG"
                    onChange={(e) => {
                      setStudentImage(e.target.files[0]);
                    }}
                  />
                )}

                {studentImage && (
                  <>
                    <img
                      src={`${import.meta.env.VITE_IMG_SERVER}` + studentImage}
                      alt=""
                      style={{ height: "40px" }}
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Student's particular End */}

          {/* Academic Background Start */}

          <div className="d-flex bg1 px-3 mt-2 py-1">
            <p className="text1 mb-0">Academic Background</p>
          </div>
          <div className="container-fluid">
            <div className="row px-1 py-1">
              <div className="col-lg-3 mb-2">
                <label className="form-label label1">Current School Name</label>
                <input
                  className="form-control input1"
                  type="text"
                  placeholder=""
                  aria-label="form-control example"
                  onChange={(e) => {
                    setCurrentSchoolName(e.target.value);
                  }}
                  value={currentSchoolName}
                />
              </div>
              <div className="col-lg-3 mb-2">
                <div className="row">
                  <div className="col-lg-6">
                    <label className="form-label label1">Start Date</label>
                    <input
                      type="date"
                      className="form-control input1"
                      onChange={(e) => {
                        setCurrentSchoolStartDate(e.target.value);
                      }}
                      value={currentSchoolStartDate}
                    />
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label label1">Grade/Class</label>
                    <input
                      className="form-control input1"
                      type="text"
                      placeholder=""
                      aria-label="form-control example"
                      onChange={(e) => {
                        setCurrentSchoolStartGrade(e.target.value);
                      }}
                      value={currentSchoolStartGrade}
                    />
                  </div>
                </div>
              </div>

              <div className="col-lg-3 mb-2">
                <div className="row">
                  <div className="col-lg-6">
                    <label className="form-label label1">Finished Date</label>
                    <input
                      type="date"
                      className="form-control input1"
                      onChange={(e) => {
                        setCurrentSchoolEndDate(e.target.value);
                      }}
                      value={currentSchoolEndDate}
                    />
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label label1">Grade/Class</label>
                    <input
                      className="form-control input1"
                      type="text"
                      placeholder=""
                      aria-label="form-control example"
                      onChange={(e) => {
                        setCurrentSchoolEndGrade(e.target.value);
                      }}
                      value={currentSchoolEndGrade}
                    />
                  </div>
                </div>
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">
                  Medium of Instruction
                </label>
                <div className="d-flex">
                  <div className="form-check col-lg-4">
                    <input
                      className="form-check-input mt-1"
                      type="radio"
                      value="Bangla"
                      name="mediumInstruction"
                      checked={currentSchoolInstruction === "Bangla"}
                      onChange={(e) => {
                        setCurrentSchoolInstruction(e.target.value);
                      }}
                    />
                    <label className="form-check-label font-13 fw-500 ms-1">
                      Bangla
                    </label>
                  </div>
                  <div className="form-check col-lg-4">
                    <input
                      className="form-check-input mt-1"
                      type="radio"
                      value="English"
                      name="mediumInstruction"
                      checked={currentSchoolInstruction === "English"}
                      onChange={(e) => {
                        setCurrentSchoolInstruction(e.target.value);
                      }}
                    />
                    <label className="form-check-label font-13 fw-500 ms-1">
                      English
                    </label>
                  </div>
                  <div className="form-check col-lg-4">
                    <input
                      className="form-check-input input1"
                      type="radio"
                      value="Others"
                      name="mediumInstruction"
                      checked={currentSchoolInstruction === "Others"}
                      onChange={(e) => {
                        setCurrentSchoolInstruction(e.target.value);
                      }}
                    />
                    <input
                      className="form-control input1"
                      type="text"
                      placeholder="Others"
                      aria-label="form-control example"
                      onChange={(e) => {
                        setCurrentSchoolInstruction(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">
                  Previous School Name
                </label>
                <input
                  className="form-control input1"
                  type="text"
                  placeholder=""
                  aria-label="form-control example"
                  onChange={(e) => {
                    setPreviousSchoolName1(e.target.value);
                  }}
                  value={previousSchoolName1}
                />
              </div>
              <div className="col-lg-3 mb-2">
                <div className="row">
                  <div className="col-lg-6">
                    <label className="form-label label1">Start Date</label>
                    <input
                      type="date"
                      className="form-control input1"
                      onChange={(e) => {
                        setPreviousSchoolStartDate1(e.target.value);
                      }}
                      value={previousSchoolStartDate1}
                    />
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label label1">Grade/Class</label>
                    <input
                      className="form-control input1"
                      type="text"
                      placeholder=""
                      aria-label="form-control example"
                      onChange={(e) => {
                        setPreviousSchoolStartGrade1(e.target.value);
                      }}
                      value={previousSchoolStartGrade1}
                    />
                  </div>
                </div>
              </div>

              <div className="col-lg-3 mb-2">
                <div className="row">
                  <div className="col-lg-6">
                    <label className="form-label label1">Finished Date</label>
                    <input
                      type="date"
                      className="form-control input1"
                      onChange={(e) => {
                        setPreviousSchoolEndDate1(e.target.value);
                      }}
                      value={previousSchoolEndDate1}
                    />
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label label1">Grade/Class</label>
                    <input
                      className="form-control input1"
                      type="text"
                      placeholder=""
                      aria-label="form-control example"
                      onChange={(e) => {
                        setPreviousSchoolEndGrade1(e.target.value);
                      }}
                      value={previousSchoolEndGrade1}
                    />
                  </div>
                </div>
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">
                  Medium of Instruction
                </label>
                <div className="d-flex">
                  <div className="form-check col-lg-4">
                    <input
                      className="form-check-input mt-1"
                      type="radio"
                      value="Bangla"
                      name="preMediumInstruction1"
                      checked={previousSchoolInstruction1 === "Bangla"}
                      onChange={(e) => {
                        setPreviousSchoolInstruction1(e.target.value);
                      }}
                    />
                    <label className="form-check-label font-13 fw-500 ms-1">
                      Bangla
                    </label>
                  </div>
                  <div className="form-check col-lg-4">
                    <input
                      className="form-check-input mt-1"
                      type="radio"
                      value="English"
                      name="preMediumInstruction1"
                      checked={previousSchoolInstruction1 === "English"}
                      onChange={(e) => {
                        setPreviousSchoolInstruction1(e.target.value);
                      }}
                    />
                    <label className="form-check-label font-13 fw-500 ms-1">
                      English
                    </label>
                  </div>
                  <div className="form-check col-lg-4">
                    <input
                      className="form-check-input mt-1"
                      type="radio"
                      value="Others"
                      name="preMediumInstruction1"
                      checked={previousSchoolInstruction1 === "Others"}
                      onChange={(e) => {
                        setPreviousSchoolInstruction1(e.target.value);
                      }}
                    />
                    <input
                      className="form-control input1"
                      type="text"
                      placeholder="Others"
                      aria-label="form-control example"
                      onChange={(e) => {
                        setPreviousSchoolInstruction1(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Previous School 2 */}
              {activeSchool > 1 && (
                <>
                  <div className="col-lg-3 mb-2">
                    <label className="form-label label1">
                      Previous School Name
                    </label>
                    <input
                      className="form-control input1"
                      type="text"
                      placeholder=""
                      aria-label="form-control example"
                      onChange={(e) => {
                        setPreviousSchoolName2(e.target.value);
                      }}
                      value={previousSchoolName2}
                    />
                  </div>
                  <div className="col-lg-3 mb-2">
                    <div className="row">
                      <div className="col-lg-6">
                        <label className="form-label label1">Start Date</label>
                        <input
                          type="date"
                          className="form-control input1"
                          onChange={(e) => {
                            setPreviousSchoolStartDate2(e.target.value);
                          }}
                          value={previousSchoolStartDate2}
                        />
                      </div>
                      <div className="col-lg-6">
                        <label className="form-label label1">Grade/Class</label>
                        <input
                          className="form-control input1"
                          type="text"
                          placeholder=""
                          aria-label="form-control example"
                          onChange={(e) => {
                            setPreviousSchoolStartGrade2(e.target.value);
                          }}
                          value={previousSchoolStartGrade2}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 mb-2">
                    <div className="row">
                      <div className="col-lg-6">
                        <label className="form-label label1">
                          Finished Date
                        </label>
                        <input
                          type="date"
                          className="form-control input1"
                          onChange={(e) => {
                            setPreviousSchoolEndDate2(e.target.value);
                          }}
                          value={previousSchoolEndDate2}
                        />
                      </div>
                      <div className="col-lg-6">
                        <label className="form-label label1">Grade/Class</label>
                        <input
                          className="form-control input1"
                          type="text"
                          placeholder=""
                          aria-label="form-control example"
                          onChange={(e) => {
                            setPreviousSchoolEndGrade2(e.target.value);
                          }}
                          value={previousSchoolStartGrade2}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 mb-2">
                    <label className="form-label label1">
                      Medium of Instruction
                    </label>
                    <div className="d-flex">
                      <div className="form-check col-lg-4">
                        <input
                          className="form-check-input mt-1"
                          type="radio"
                          value="Bangla"
                          name="preMediumInstruction2"
                          checked={previousSchoolInstruction2 === "Bangla"}
                          onChange={(e) => {
                            setPreviousSchoolInstruction2(e.target.value);
                          }}
                        />
                        <label className="form-check-label font-13 fw-500 ms-1">
                          Bangla
                        </label>
                      </div>
                      <div className="form-check col-lg-4">
                        <input
                          className="form-check-input mt-1"
                          type="radio"
                          value="English"
                          name="preMediumInstruction2"
                          checked={previousSchoolInstruction2 === "English"}
                          onChange={(e) => {
                            setPreviousSchoolInstruction2(e.target.value);
                          }}
                        />
                        <label className="form-check-label font-13 fw-500 ms-1">
                          English
                        </label>
                      </div>
                      <div className="form-check col-lg-4">
                        <input
                          className="form-check-input mt-1"
                          type="radio"
                          value="Others"
                          name="preMediumInstruction2"
                          checked={previousSchoolInstruction2 === "Others"}
                          onChange={(e) => {
                            setPreviousSchoolInstruction2(e.target.value);
                          }}
                        />
                        <input
                          className="form-control input1"
                          type="text"
                          placeholder="Others"
                          aria-label="form-control example"
                          onChange={(e) => {
                            setPreviousSchoolInstruction2(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Previous School 3 */}
              {activeSchool > 2 && (
                <>
                  <div className="col-lg-3 mb-2">
                    <label className="form-label label1">
                      Previous School Name
                    </label>
                    <input
                      className="form-control input1"
                      type="text"
                      placeholder=""
                      aria-label="form-control example"
                      onChange={(e) => {
                        setPreviousSchoolName3(e.target.value);
                      }}
                      value={previousSchoolName3}
                    />
                  </div>
                  <div className="col-lg-3 mb-2">
                    <div className="row">
                      <div className="col-lg-6">
                        <label className="form-label label1">Start Date</label>
                        <input
                          type="date"
                          className="form-control input1"
                          onChange={(e) => {
                            setPreviousSchoolStartDate3(e.target.value);
                          }}
                          value={previousSchoolStartDate3}
                        />
                      </div>
                      <div className="col-lg-6">
                        <label className="form-label label1">Grade/Class</label>
                        <input
                          className="form-control input1"
                          type="text"
                          placeholder=""
                          aria-label="form-control example"
                          onChange={(e) => {
                            setPreviousSchoolStartGrade3(e.target.value);
                          }}
                          value={previousSchoolStartGrade3}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 mb-2">
                    <div className="row">
                      <div className="col-lg-6">
                        <label className="form-label label1">
                          Finished Date
                        </label>
                        <input
                          type="date"
                          className="form-control input1"
                          onChange={(e) => {
                            setPreviousSchoolEndDate3(e.target.value);
                          }}
                          value={previousSchoolEndDate3}
                        />
                      </div>
                      <div className="col-lg-6">
                        <label className="form-label label1">Grade/Class</label>
                        <input
                          className="form-control input1"
                          type="text"
                          placeholder=""
                          aria-label="form-control example"
                          onChange={(e) => {
                            setPreviousSchoolEndGrade3(e.target.value);
                          }}
                          value={previousSchoolEndGrade3}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 mb-2">
                    <label className="form-label label1">
                      Medium of Instruction
                    </label>
                    <div className="d-flex">
                      <div className="form-check col-lg-4">
                        <input
                          className="form-check-input mt-1"
                          type="radio"
                          value="Bangla"
                          name="preMediumInstruction3"
                          checked={previousSchoolInstruction3 === "Bangla"}
                          onChange={(e) => {
                            setPreviousSchoolInstruction3(e.target.value);
                          }}
                        />
                        <label className="form-check-label font-13 fw-500 ms-1">
                          Bangla
                        </label>
                      </div>
                      <div className="form-check col-lg-4">
                        <input
                          className="form-check-input mt-1"
                          type="radio"
                          value="English"
                          name="preMediumInstruction3"
                          checked={previousSchoolInstruction3 === "English"}
                          onChange={(e) => {
                            setPreviousSchoolInstruction3(e.target.value);
                          }}
                        />
                        <label className="form-check-label font-13 fw-500 ms-1">
                          English
                        </label>
                      </div>
                      <div className="form-check col-lg-4">
                        <input
                          className="form-check-input mt-1"
                          type="radio"
                          value="Others"
                          name="preMediumInstruction3"
                          checked={previousSchoolInstruction3 === "Others"}
                          onChange={(e) => {
                            setPreviousSchoolInstruction3(e.target.value);
                          }}
                        />
                        <input
                          className="form-control input1"
                          type="text"
                          placeholder="Others"
                          aria-label="form-control example"
                          onChange={(e) => {
                            setPreviousSchoolInstruction3(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeSchool > 2 ? (
                <></>
              ) : (
                <>
                  <div className="col-lg-3 my-2">
                    <div
                      className="input1 border-0 bg2 shadow2 text-center py-1 label1"
                      style={{ cursor: "pointer" }}
                      onClick={addSchoolField}
                    >
                      + Add More School
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Academic Background End */}

          {/* Medical Condition Start */}

          <div className="d-flex bg1 px-3 mt-2 py-1">
            <p className="text1 mb-0">Medical Condition</p>
          </div>

          <div className="container-fluid">
            <div className="row px-1 py-1">
              <div className="col-lg-3 mb-2">
                <label className="form-label label1">Physical Disability</label>
                <div className="d-flex">
                  <div className="form-check col-lg-6">
                    <input
                      className="form-check-input mt-1"
                      type="radio"
                      value="Yes"
                      name="physicalDisability"
                      checked={physicalDisability === "Yes"}
                      onChange={(e) => {
                        setPhysicalDisability(e.target.value);
                      }}
                    />
                    <label className="form-check-label font-13 fw-500 ms-1">
                      Yes
                    </label>
                  </div>
                  <div className="form-check col-lg-6">
                    <input
                      className="form-check-input mt-1"
                      type="radio"
                      name="physicalDisability"
                      value="No"
                      checked={physicalDisability === "No"}
                      onChange={(e) => {
                        setPhysicalDisability(e.target.value);
                      }}
                    />
                    <label className="form-check-label font-13 fw-500 ms-1">
                      No
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">Partially Sighted</label>
                <div className="d-flex">
                  <div className="form-check col-lg-6">
                    <input
                      className="form-check-input mt-1"
                      type="radio"
                      value="Yes"
                      checked={partiallySighted === "Yes"}
                      name="partiallySighted"
                      onChange={(e) => {
                        setPartiallySighted(e.target.value);
                      }}
                    />
                    <label className="form-check-label font-13 fw-500 ms-1">
                      Yes
                    </label>
                  </div>
                  <div className="form-check col-lg-6">
                    <input
                      className="form-check-input mt-1"
                      type="radio"
                      name="partiallySighted"
                      value="No"
                      checked={partiallySighted === "No"}
                      onChange={(e) => {
                        setPartiallySighted(e.target.value);
                      }}
                    />
                    <label className="form-check-label font-13 fw-500 ms-1">
                      No
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">Hearing Impairment</label>
                <div className="d-flex">
                  <div className="form-check col-lg-6">
                    <input
                      className="form-check-input mt-1"
                      type="radio"
                      value="Yes"
                      name="hearingImpairment"
                      checked={hearingImpairment === "Yes"}
                      onChange={(e) => {
                        setHearingImpairment(e.target.value);
                      }}
                    />
                    <label className="form-check-label font-13 fw-500 ms-1">
                      Yes
                    </label>
                  </div>
                  <div className="form-check col-lg-6">
                    <input
                      className="form-check-input mt-1"
                      type="radio"
                      name="hearingImpairment"
                      value="No"
                      checked={hearingImpairment === "No"}
                      onChange={(e) => {
                        setHearingImpairment(e.target.value);
                      }}
                    />
                    <label className="form-check-label font-13 fw-500 ms-1">
                      No
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">
                  Mobility Difficulties
                </label>
                <div className="d-flex">
                  <div className="form-check col-lg-6">
                    <input
                      className="form-check-input mt-1"
                      type="radio"
                      value="Yes"
                      name="mobilityDifficulties"
                      checked={mobilityDifficulties === "Yes"}
                      onChange={(e) => {
                        setMobilityDifficulties(e.target.value);
                      }}
                    />
                    <label className="form-check-label font-13 fw-500 ms-1">
                      Yes
                    </label>
                  </div>
                  <div className="form-check col-lg-6">
                    <input
                      className="form-check-input mt-1"
                      type="radio"
                      name="mobilityDifficulties"
                      value="No"
                      checked={mobilityDifficulties === "No"}
                      onChange={(e) => {
                        setMobilityDifficulties(e.target.value);
                      }}
                    />
                    <label className="form-check-label font-13 fw-500 ms-1">
                      No
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">Mental Disability</label>
                <div className="d-flex">
                  <div className="form-check col-lg-6">
                    <input
                      className="form-check-input mt-1"
                      type="radio"
                      value="Yes"
                      name="mentalDisability"
                      checked={mentalDisability === "Yes"}
                      onChange={(e) => {
                        setMentalDisability(e.target.value);
                      }}
                    />
                    <label className="form-check-label font-13 fw-500 ms-1">
                      Yes
                    </label>
                  </div>
                  <div className="form-check col-lg-6">
                    <input
                      className="form-check-input mt-1"
                      type="radio"
                      name="mentalDisability"
                      checked={mentalDisability === "No"}
                      value="No"
                      onChange={(e) => {
                        setMentalDisability(e.target.value);
                      }}
                    />
                    <label className="form-check-label font-13 fw-500 ms-1">
                      No
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">Blood Group</label>
                <select
                  className="form-select input1 py-0"
                  onChange={(e) => {
                    setBloodGroup(e.target.value);
                  }}
                  value={bloodGroup}
                >
                  <option selected value={""}>
                    Select
                  </option>
                  <option value={"A+"}>A+</option>
                  <option value={"A-"}>A-</option>
                  <option value={"B+"}>B+</option>
                  <option value={"B-"}>B-</option>
                  <option value={"O+"}>O+</option>
                  <option value={"O-"}>O-</option>
                  <option value={"AB+"}>AB+</option>
                  <option value={"AB-"}>AB-</option>
                </select>
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">Others</label>
                <input
                  className="form-control input1"
                  type="text"
                  placeholder=""
                  aria-label="form-control example"
                  onChange={(e) => {
                    setOtherConditions(e.target.value);
                  }}
                />
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">Remark</label>
                <input
                  className="form-control input1"
                  type="text"
                  placeholder=""
                  aria-label="form-control example"
                  onChange={(e) => {
                    setMedRemarks(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>

          {/* Medical Condition End */}

          {/* Parents Start */}

          <div className="d-flex bg1 px-3 mt-2 py-1">
            <p className="text1 mb-0">Parent's & Gaurdian's Particulars</p>
          </div>
          <div className="container-fluid">
            <div className="row px-1 py-1">
              <div className="col-lg-3 mb-2">
                <label className="form-label label1">
                  Father's Name<span className="text-danger fs-14">*</span>
                </label>
                <input
                  className="form-control input1"
                  type="text"
                  placeholder=""
                  aria-label="form-control example"
                  onChange={(e) => {
                    setFatherName(e.target.value);
                  }}
                  value={fatherName}
                />
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">
                  Father's Occupation
                  <span className="text-danger fs-14">*</span>
                </label>
                <input
                  className="form-control input1"
                  type="text"
                  placeholder=""
                  aria-label="form-control example"
                  onChange={(e) => {
                    setFatherJob(e.target.value);
                  }}
                  value={fatherJob}
                />
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">
                  Father's Education<span className="text-danger fs-14">*</span>
                </label>
                <input
                  className="form-control input1"
                  type="text"
                  placeholder=""
                  aria-label="form-control example"
                  onChange={(e) => {
                    setFatherEdu(e.target.value);
                  }}
                  value={fatherEdu}
                />
              </div>

              <div className="col-lg-3 mb-2">
                <div className="row">
                  <div className="col-lg-6">
                    <label className="form-label label1">
                      Father's NID<span className="text-danger fs-14">*</span>
                    </label>
                    <input
                      className="form-control input1"
                      type="text"
                      placeholder=""
                      aria-label="form-control example"
                      onChange={(e) => {
                        setFatherNID(e.target.value);
                      }}
                      value={fatherNID}
                    />
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label label1">Father's TIN</label>
                    <input
                      className="form-control input1"
                      type="text"
                      placeholder=""
                      aria-label="form-control example"
                      onChange={(e) => {
                        setFatherTIN(e.target.value);
                      }}
                      value={fatherTIN}
                    />
                  </div>
                </div>
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">
                  Mother's Name<span className="text-danger fs-14">*</span>
                </label>
                <input
                  className="form-control input1"
                  type="text"
                  placeholder=""
                  aria-label="form-control example"
                  onChange={(e) => {
                    setMotherName(e.target.value);
                  }}
                  value={motherName}
                />
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">
                  Mother's Occupation
                  <span className="text-danger fs-14">*</span>
                </label>
                <input
                  className="form-control input1"
                  type="text"
                  placeholder=""
                  aria-label="form-control example"
                  onChange={(e) => {
                    setMotherJob(e.target.value);
                  }}
                  value={motherJob}
                />
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">
                  Mother's Education<span className="text-danger fs-14">*</span>
                </label>
                <input
                  className="form-control input1"
                  type="text"
                  placeholder=""
                  aria-label="form-control example"
                  onChange={(e) => {
                    setMotherEdu(e.target.value);
                  }}
                  value={motherEdu}
                />
              </div>

              <div className="col-lg-3 mb-2">
                <div className="row">
                  <div className="col-lg-6">
                    <label className="form-label label1">
                      Mother's NID<span className="text-danger fs-14">*</span>
                    </label>
                    <input
                      className="form-control input1"
                      type="text"
                      placeholder=""
                      aria-label="form-control example"
                      onChange={(e) => {
                        setMotherNID(e.target.value);
                      }}
                      value={motherNID}
                    />
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label label1">Mother's TIN</label>
                    <input
                      className="form-control input1"
                      type="text"
                      placeholder=""
                      aria-label="form-control example"
                      onChange={(e) => {
                        setMotherTIN(e.target.value);
                      }}
                      value={motherTIN}
                    />
                  </div>
                </div>
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">
                  Gaurdian's Name 1<span className="text-danger fs-14">*</span>
                </label>
                <input
                  className="form-control input1"
                  type="text"
                  onChange={(e) => {
                    setGuardianName1(e.target.value);
                  }}
                  value={guardianName1}
                />
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">
                  Relation 1<span className="text-danger fs-14">*</span>
                </label>
                <input
                  className="form-control input1"
                  type="text"
                  onChange={(e) => {
                    setGuardianRelation1(e.target.value);
                  }}
                  value={guardianRelation1}
                />
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">Gaurdian's Name 2</label>
                <input
                  className="form-control input1"
                  type="text"
                  placeholder=""
                  aria-label="form-control example"
                  onChange={(e) => {
                    setGuardianName2(e.target.value);
                  }}
                  value={guardianName2}
                />
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">Relation 2</label>
                <input
                  className="form-control input1"
                  type="text"
                  placeholder=""
                  aria-label="form-control example"
                  onChange={(e) => {
                    setGuardianRelation2(e.target.value);
                  }}
                  value={guardianRelation2}
                />
              </div>

              <div className="col-lg-12 mb-2">
                <label className="form-label label1">Sibling Information</label>
                <textarea
                  className="form-control"
                  type="text"
                  placeholder=""
                  row="2"
                  aria-label="form-control example"
                  onChange={(e) => {
                    setSiblingInfo(e.target.value);
                  }}
                  value={siblingInfo}
                ></textarea>
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">Father's Image</label>
                {!fatherImage && (
                  <input
                    className="form-control input1 pt-1"
                    type="file"
                    placeholder=""
                    aria-label="form-control example"
                    accept="image/png,image/jpg,image/png,image/JPEG"
                    onChange={(e) => {
                      setFatherImage(e.target.files[0]);
                    }}
                  />
                )}

                {fatherImage && (
                  <>
                    <img
                      src={`${import.meta.env.VITE_IMG_SERVER}` + fatherImage}
                      alt=""
                      style={{ height: "40px" }}
                    />
                  </>
                )}
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">Mother's Image</label>
                {!motherImage && (
                  <input
                    className="form-control input1 pt-1"
                    type="file"
                    placeholder=""
                    aria-label="form-control example"
                    accept="image/png,image/jpg,image/png,image/JPEG"
                    onChange={(e) => {
                      setMotherImage(e.target.files[0]);
                    }}
                  />
                )}

                {motherImage && (
                  <>
                    <img
                      src={`${import.meta.env.VITE_IMG_SERVER}` + motherImage}
                      alt=""
                      style={{ height: "40px" }}
                    />
                  </>
                )}
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">Gaurdian's Image 1</label>
                {!guardian1Image && (
                  <input
                    className="form-control input1 pt-1"
                    type="file"
                    placeholder=""
                    aria-label="form-control example"
                    accept="image/png,image/jpg,image/png,image/JPEG"
                    onChange={(e) => {
                      setGuardian1Image(e.target.files[0]);
                    }}
                  />
                )}

                {guardian1Image && (
                  <>
                    <img
                      src={
                        `${import.meta.env.VITE_IMG_SERVER}` + guardian1Image
                      }
                      alt=""
                      style={{ height: "40px" }}
                    />
                  </>
                )}
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">Gaurdian's Image 2</label>
                {!guardian2Image && (
                  <input
                    className="form-control input1 pt-1"
                    type="file"
                    placeholder=""
                    aria-label="form-control example"
                    accept="image/png,image/jpg,image/png,image/JPEG"
                    onChange={(e) => {
                      setGuardian2Image(e.target.files[0]);
                    }}
                  />
                )}

                {guardian2Image && (
                  <>
                    <img
                      src={
                        `${import.meta.env.VITE_IMG_SERVER}` + guardian2Image
                      }
                      alt=""
                      style={{ height: "40px" }}
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Parents End */}

          {/* Address Start */}

          <div className="d-flex bg1 px-3 mt-2 py-1">
            <p className="text1 mb-0">Address</p>
          </div>
          <div className="container-fluid">
            <div className="row px-1 py-1">
              <label className="form-label label1">Residency</label>
              <div className="d-flex">
                <div className="form-check col-lg-2">
                  <input
                    className="form-check-input mt-1"
                    type="radio"
                    value="Local"
                    name="residency"
                    onChange={(e) => {
                      setResidencyStat(e.target.value);
                    }}
                    checked={residencyStat === "Local"}
                  />
                  <label className="form-check-label font-13 fw-500 ms-1">
                    Local
                  </label>
                </div>
                <div className="form-check col-lg-2">
                  <input
                    className="form-check-input mt-1"
                    type="radio"
                    name="residency"
                    value="Foreign"
                    onChange={(e) => {
                      setResidencyStat(e.target.value);
                    }}
                    checked={residencyStat === "Foreign"}
                  />
                  <label
                    className="form-check-label font-13 fw-500 ms-1"
                    htmlFor="flexRadioCheckedDisabled"
                  >
                    Foreign
                  </label>
                </div>
              </div>
            </div>
            {residencyStat === "Foreign" && (
              <>
                <div className="row px-1 py-1">
                  <div className="col-lg-6">
                    <label className="form-label label1">
                      Present Address
                      <span className="text-danger fs-14">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      type="text"
                      placeholder=""
                      row="2"
                      aria-label="form-control example"
                      onChange={(e) => {
                        setPresentAddress(e.target.value);
                      }}
                    ></textarea>
                  </div>

                  <div className="col-lg-6">
                    <label className="form-label label1">
                      Permanent Address
                    </label>
                    <textarea
                      className="form-control"
                      type="text"
                      placeholder=""
                      row="2"
                      aria-label="form-control example"
                      onChange={(e) => {
                        setPermanentAddress(e.target.value);
                      }}
                    ></textarea>
                  </div>
                </div>
              </>
            )}
            {residencyStat === "Local" && (
              <>
                <div className="row px-1 py-1">
                  {/* Present Address */}

                  <div className="col-lg-6">
                    <label className="form-label label1">
                      Present Address
                      <span className="text-danger fs-14">*</span>
                    </label>
                    <div className="row">
                      <div className="col-lg-12 mb-2">
                        <input
                          className="form-control input1"
                          type="text"
                          placeholder="Street"
                          aria-label="form-control example"
                          onChange={(e) => {
                            setPresentStreetLocal(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <select
                          className="form-select input1 py-0"
                          onChange={(e) => {
                            setPresentDistrictLocal(e.target.value);
                          }}
                        >
                          <option selected value={""}>
                            Select Division
                          </option>
                          {divisions.map((item) => (
                            <option key={item.id} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-lg-6">
                        <select
                          className="form-select input1 py-0"
                          onChange={(e) => {
                            setPresentCityLocal(e.target.value);
                          }}
                        >
                          <option selected value={""}>
                            Select District
                          </option>
                          {districts
                            .filter((item) => {
                              return item.division === presentDistrictLocal;
                            })
                            .map((item) => (
                              <option key={item.id} value={item.value}>
                                {item.label}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Permanent Address */}

                  <div className="col-lg-6">
                    <label className="form-label label1">
                      Permanent Address
                    </label>
                    <div className="row mb-2">
                      <div className="col-lg-12">
                        <input
                          className="form-control input1"
                          type="text"
                          placeholder="Street"
                          aria-label="form-control example"
                          onChange={(e) => {
                            setPermanentStreetLocal(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <select
                          className="form-select input1 py-0"
                          onChange={(e) => {
                            setPermanentDistrictLocal(e.target.value);
                          }}
                        >
                          <option selected value={""}>
                            Select Division
                          </option>
                          {divisions.map((item) => (
                            <option key={item.id} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-lg-6">
                        <select
                          className="form-select input1 py-0"
                          onChange={(e) => {
                            setPermanentCityLocal(e.target.value);
                          }}
                        >
                          <option selected value={""}>
                            Select District
                          </option>
                          {districts
                            .filter((item) => {
                              return item.division === permanentDistrictLocal;
                            })
                            .map((item) => (
                              <option key={item.id} value={item.value}>
                                {item.label}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Address End */}

          {/* Contacts Start */}

          <div className="d-flex bg1 px-3 mt-2 py-1">
            <p className="text1 mb-0">Contacts</p>
          </div>
          <div className="container-fluid">
            <div className="row px-1 py-1">
              <div className="col-lg-3 mb-2">
                <label className="form-label label1">
                  Father's Contact<span className="text-danger fs-14">*</span>
                </label>
                <input
                  className="form-control input1"
                  type="text"
                  placeholder=""
                  aria-label="form-control example"
                  onChange={(e) => {
                    setFatherContact(e.target.value);
                  }}
                  value={fatherContact}
                />
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">
                  Mother's Contact<span className="text-danger fs-14">*</span>
                </label>
                <input
                  className="form-control input1"
                  type="text"
                  placeholder=""
                  aria-label="form-control example"
                  onChange={(e) => {
                    setMotherContact(e.target.value);
                  }}
                  value={motherContact}
                />
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">
                  Emergency Contact 1
                  <span className="text-danger fs-14">*</span>
                </label>

                {/* ANCHOR Current WORK */}
                <input
                  className="form-control input1"
                  type="text"
                  placeholder=""
                  aria-label="form-control example"
                  onChange={(e) => {
                    setEmergencyCon1(e.target.value);
                  }}
                  value={emergencyCon1}
                />
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">Emergency Contact 2</label>
                <input
                  className="form-control input1"
                  type="text"
                  placeholder=""
                  aria-label="form-control example"
                  onChange={(e) => {
                    setEmergencyCon2(e.target.value);
                  }}
                  value={emergencyCon2}
                />
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">Father's Email</label>
                <input
                  className="form-control input1"
                  type="text"
                  placeholder=""
                  aria-label="form-control example"
                  onChange={(e) => {
                    setFatherEmail(e.target.value);
                  }}
                  value={fatherEmail}
                />
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">Mother's Email</label>
                <input
                  className="form-control input1"
                  type="text"
                  placeholder=""
                  aria-label="form-control example"
                  onChange={(e) => {
                    setMotherEmail(e.target.value);
                  }}
                  value={motherEmail}
                />
              </div>

              <div className="col-lg-3 mb-2">
                <div className="row">
                  <div className="col-lg-6">
                    <label className="form-label label1">
                      Relation<span className="text-danger fs-14">*</span>
                    </label>
                    <input
                      className="form-control input1"
                      type="text"
                      placeholder=""
                      aria-label="form-control example"
                      onChange={(e) => {
                        setEmergencyRel1(e.target.value);
                      }}
                      value={emergencyRel1}
                    />
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label label1">
                      SMS / Contact<span className="text-danger fs-14">*</span>
                    </label>
                    <input
                      className="form-control input1"
                      type="text"
                      placeholder=""
                      aria-label="form-control example"
                      onChange={(e) => {
                        setEmergencySMS1(e.target.value);
                      }}
                      value={emergencySMS1}
                    />
                  </div>
                </div>
              </div>

              <div className="col-lg-3 mb-2">
                <div className="row">
                  <div className="col-lg-6">
                    <label className="form-label label1">Relation</label>
                    <input
                      className="form-control input1"
                      type="text"
                      placeholder=""
                      aria-label="form-control example"
                      onChange={(e) => {
                        setEmergencyRel2(e.target.value);
                      }}
                      value={emergencyRel2}
                    />
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label label1">SMS / Contact</label>
                    <input
                      className="form-control input1"
                      type="text"
                      placeholder=""
                      aria-label="form-control example"
                      onChange={(e) => {
                        setEmergencySMS2(e.target.value);
                      }}
                      value={emergencySMS2}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contacts End */}

          {/* Payment Start */}

          <div className="d-flex bg1 px-3 mt-2 py-1">
            <p className="text1 mb-0">Payment of Fees</p>
          </div>
          <div className="container-fluid">
            <div className="row px-1 py-1">
              <div className="col-lg-3 mb-2">
                <label className="form-label label1">
                  Who will pay his/her fees?
                  <span className="text-danger fs-14">*</span>
                </label>
                <input
                  className="form-control input1"
                  type="text"
                  placeholder=""
                  aria-label="form-control example"
                  onChange={(e) => {
                    setFeePayer(e.target.value);
                  }}
                  value={feePayer}
                />
              </div>
              <div className="col-lg-3 mb-2">
                <label className="form-label label1">
                  Relation<span className="text-danger fs-14">*</span>
                </label>
                <input
                  className="form-control input1"
                  type="text"
                  placeholder=""
                  aria-label="form-control example"
                  onChange={(e) => {
                    setFeePayerRelation(e.target.value);
                  }}
                  value={feePayerRelation}
                />
              </div>
              <div className="col-lg-3 mb-2">
                <label className="form-label label1">
                  Are you an employee of our School?
                </label>
                <div className="d-flex">
                  <div className="form-check col-lg-6">
                    <input
                      className="form-check-input mt-1"
                      type="radio"
                      value="Yes"
                      name="employeeStatus"
                      onChange={(e) => {
                        setEmployeeStatus(e.target.value);
                      }}
                      checked={employeeStatus === "Yes"}
                    />
                    <label className="form-check-label font-13 fw-500 ms-1">
                      Yes
                    </label>
                  </div>
                  <div className="form-check col-lg-6">
                    <input
                      className="form-check-input mt-1"
                      type="radio"
                      name="Address"
                      value="No"
                      onChange={(e) => {
                        setEmployeeStatus(e.target.value);
                      }}
                      checked={employeeStatus === "No"}
                    />
                    <label
                      className="form-check-label font-13 fw-500 ms-1"
                      htmlFor="flexRadioCheckedDisabled"
                    >
                      No
                    </label>
                  </div>
                </div>
              </div>

              {employeeStatus === "Yes" && (
                <>
                  <div className="col-lg-3 mb-2">
                    <label className="form-label label1">Designation</label>
                    <input
                      className="form-control input1"
                      type="text"
                      placeholder=""
                      aria-label="form-control example"
                      onChange={(e) => {
                        setEmployeeDesignation(e.target.value);
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Payment End */}

          {/* Sibling Start */}

          <div className="d-flex bg1 px-3 mt-2 py-1">
            <p className="text1 mb-0">Add Siblings</p>
          </div>
          <div className="container-fluid">
            <div className="row px-1 py-1">
              <div className="col-lg-3 my-2">
                <div
                  className="input1 border-0 bg2 shadow2 text-center py-1 label1"
                  style={{ cursor: "pointer" }}
                  data-bs-toggle="modal"
                  data-bs-target="#siblingModal"
                >
                  + Add Siblings
                </div>
              </div>

              <div className="col-lg-3 my-2">
                <div className="input1 border-0 bg-light text-center py-1 label1">
                  {sibling1}{" "}
                  {sibling1 && (
                    <>
                      <i
                        class="fa-solid fa-circle-xmark ms-2"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          setSibling1("");
                        }}
                      ></i>
                    </>
                  )}
                </div>
              </div>
              <div className="col-lg-3 my-2">
                <div className="input1 border-0 bg-light text-center py-1 label1">
                  {sibling2}{" "}
                  {sibling2 && (
                    <>
                      <i
                        class="fa-solid fa-circle-xmark ms-2"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          setSibling2("");
                        }}
                      ></i>
                    </>
                  )}
                </div>
              </div>
              <div className="col-lg-3 my-2">
                <div className="input1 border-0 bg-light text-center py-1 label1">
                  {sibling3}{" "}
                  {sibling3 && (
                    <>
                      <i
                        class="fa-solid fa-circle-xmark ms-2"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          setSibling3("");
                        }}
                      ></i>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sibling End */}

          {/* Note Start */}

          {/* ANCHOR Current Work */}

          <div className="d-flex bg1 px-3 mt-2 py-1">
            <p className="text1 mb-0">Note</p>
          </div>
          <div className="container-fluid">
            <div className="row px-1 py-1">
              <div className="col-lg-12">
                <label className="form-label label1">Additional Note</label>
                <textarea
                  className="form-control"
                  type="text"
                  placeholder=""
                  row="2"
                  aria-label="form-control example"
                  onChange={(e) => {
                    setAddiotionalNotes(e.target.value);
                  }}
                  value={additionalNotes}
                ></textarea>
              </div>
            </div>
          </div>

          {/* Note End */}

          {/* Admin Section Starts */}

          <div className="d-flex bg1 px-3 mt-2 py-1">
            <p className="text1 mb-0">Admin</p>
          </div>

          <div className="container-fluid">
            <div className="row px-1 py-1">
              <div className="col-lg-3 mb-2">
                <label className="form-label label1">
                  Date of Admission<span className="text-danger fs-14">*</span>
                </label>
                <input
                  className="form-control input1"
                  type="date"
                  placeholder=""
                  aria-label="form-control example"
                  onChange={(e) => {
                    setDateOfAdmission(e.target.value);
                  }}
                />
              </div>

              <div className="col-lg-6 mb-2">
                <label className="form-label label1">
                  Documents Received<span className="text-danger fs-14">*</span>
                </label>
                <div className="d-flex justify-content-between">
                  <div className="form-check col-lg-3">
                    <input
                      className="form-check-input mt-1"
                      type="checkbox"
                      onChange={(e) => {
                        setTC(e.target.checked);
                      }}
                    />
                    <label className="form-check-label font-13 fw-500 ms-1">
                      TC
                    </label>
                  </div>
                  <div className="form-check col-lg-3">
                    <input
                      className="form-check-input mt-1"
                      type="checkbox"
                      name="reportCard"
                      onChange={(e) => {
                        setReportCard(e.target.checked);
                      }}
                    />
                    <label className="form-check-label font-13 fw-500 ms-1">
                      Report Card
                    </label>
                  </div>
                  <div className="form-check col-lg-3">
                    <input
                      className="form-check-input mt-1"
                      type="checkbox"
                      name="birthCertificate"
                      onChange={(e) => {
                        setBirthCertiReceived(e.target.checked);
                      }}
                    />
                    <label className="form-check-label font-13 fw-500 ms-1">
                      Birth Certificate
                    </label>
                  </div>
                  <div className="form-check col-lg-3">
                    <input
                      className="form-check-input mt-1"
                      type="checkbox"
                      name="photo4pp"
                      onChange={(e) => {
                        setPhoto4pp(e.target.checked);
                      }}
                    />
                    <label className="form-check-label font-13 fw-500 ms-1">
                      4PP Photograph
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">Notes</label>
                <input
                  className="form-control input1"
                  type="text"
                  placeholder=""
                  aria-label="form-control example"
                  onChange={(e) => {
                    setAdminNotes(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>

          {/* Admin Section Ends */}

          {/* Financial Aid Starts */}

          <div className="d-flex bg1 px-3 mt-2 py-1">
            <p className="text1 mb-0">Financial Aid</p>
          </div>

          <div className="container-fluid">
            <div className="row px-1 py-1">
              <div className="col-lg-3 mb-2">
                <label className="form-label label1">Financial Aid Type</label>
                <select
                  className="form-select input1 py-0"
                  onChange={(e) => {
                    setFinancialAidType(e.target.value);
                  }}
                >
                  <option selected value={""}>
                    Select
                  </option>
                  <option>Siblings</option>
                  <option>AHIS Employee</option>
                  <option>Civil Defence</option>
                  <option>Merit Based</option>
                  <option>Others</option>
                </select>
              </div>

              {/* Aid Applicable */}

              <div className="row mb-1">
                <div className="col-lg-12 mb-2">
                  <label className="form-label label1">Aid Applicable</label>
                </div>
                <div className="col-lg-3">
                  <div className="form-check">
                    <input
                      className="form-check-input mt-1"
                      type="checkbox"
                      onChange={(e) => {
                        setApplicableAidAdmission(e.target.checked);
                      }}
                    />
                    <label className="form-check-label font-13 fw-500 ms-1">
                      Admission Fee
                    </label>
                  </div>
                </div>

                {/* Admission Aid */}

                {applicableAidAdmission && (
                  <>
                    <div className="col-lg-3">
                      <label className="form-label label1">Discount Type</label>
                      <div className="d-flex ">
                        <div className="form-check col-lg-6">
                          <input
                            className="form-check-input mt-1"
                            type="radio"
                            value="percentage"
                            name="discountTypeAdmission"
                            onChange={(e) => {
                              setDiscountTypeAdmission(e.target.value);
                            }}
                          />
                          <label className="form-check-label font-13 fw-500 ms-1">
                            %
                          </label>
                        </div>
                        <div className="form-check col-lg-6">
                          <input
                            className="form-check-input mt-1"
                            type="radio"
                            name="discountTypeAdmission"
                            value="amount"
                            onChange={(e) => {
                              setDiscountTypeAdmission(e.target.value);
                            }}
                          />
                          <label className="form-check-label font-13 fw-500 ms-1">
                            Fixed Amount
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <label className="form-label label1">
                        Discount Amount
                      </label>
                      <input
                        className="form-control input1"
                        type="text"
                        placeholder=""
                        aria-label="form-control example"
                        onChange={(e) => {
                          setDiscountAmountAdmission(e.target.value);
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="row mb-1">
                <div className="col-lg-3">
                  <div className="form-check">
                    <input
                      className="form-check-input mt-1"
                      type="checkbox"
                      onChange={(e) => {
                        setApplicableAidTuition(e.target.checked);
                      }}
                    />
                    <label className="form-check-label font-13 fw-500 ms-1">
                      Tuition Fee
                    </label>
                  </div>
                </div>

                {/* Tuition Aid */}
                {applicableAidTuition && (
                  <>
                    <div className="col-lg-3">
                      <label className="form-label label1">Discount Type</label>
                      <div className="d-flex ">
                        <div className="form-check col-lg-6">
                          <input
                            className="form-check-input mt-1"
                            type="radio"
                            value="percentage"
                            name="discountTypeTuition"
                            onChange={(e) => {
                              setDiscountTypeTuition(e.target.value);
                            }}
                          />
                          <label className="form-check-label font-13 fw-500 ms-1">
                            %
                          </label>
                        </div>
                        <div className="form-check col-lg-6">
                          <input
                            className="form-check-input mt-1"
                            type="radio"
                            name="discountTypeTuition"
                            value="amount"
                            onChange={(e) => {
                              setDiscountTypeTuition(e.target.value);
                            }}
                          />
                          <label className="form-check-label font-13 fw-500 ms-1">
                            Fixed Amount
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <label className="form-label label1">
                        Discount Amount
                      </label>
                      <input
                        className="form-control input1"
                        type="text"
                        placeholder=""
                        aria-label="form-control example"
                        onChange={(e) => {
                          setDiscountAmountTuition(e.target.value);
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="row mb-1">
                <div className="col-lg-3">
                  <div className="form-check">
                    <input
                      className="form-check-input mt-1"
                      type="checkbox"
                      onChange={(e) => {
                        setApplicableAidAnnual(e.target.checked);
                      }}
                    />
                    <label className="form-check-label font-13 fw-500 ms-1">
                      Annual Fee
                    </label>
                  </div>
                </div>

                {/* Annual Fee Aid */}

                {applicableAidAnnual && (
                  <>
                    <div className="col-lg-3">
                      <label className="form-label label1">Discount Type</label>
                      <div className="d-flex ">
                        <div className="form-check col-lg-6">
                          <input
                            className="form-check-input mt-1"
                            type="radio"
                            value="percentage"
                            name="discountTypeAnnual"
                            onChange={(e) => {
                              setDiscountTypeAnnual(e.target.value);
                            }}
                          />
                          <label className="form-check-label font-13 fw-500 ms-1">
                            %
                          </label>
                        </div>
                        <div className="form-check col-lg-6">
                          <input
                            className="form-check-input mt-1"
                            type="radio"
                            name="discountTypeAnnual"
                            value="amount"
                            onChange={(e) => {
                              setDiscountTypeAnnual(e.target.value);
                            }}
                          />
                          <label className="form-check-label font-13 fw-500 ms-1">
                            Fixed Amount
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <label className="form-label label1">
                        Discount Amount
                      </label>
                      <input
                        className="form-control input1"
                        type="text"
                        placeholder=""
                        aria-label="form-control example"
                        onChange={(e) => {
                          setDiscountAmountAnnual(e.target.value);
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Accounts Section Ends */}

          {/* Document Section Starts */}

          <div className="d-flex bg1 px-3 mt-2 py-1">
            <p className="text1 mb-0">Documents</p>
          </div>

          <div className="container-fluid">
            <div className="row px-1 py-1">
              <div className="col-lg-3 mb-2">
                <label className="form-label label1">TC</label>
                <input
                  className="form-control input1 pt-1"
                  type="file"
                  placeholder=""
                  aria-label="form-control example"
                  accept="image/png,image/jpg,image/png,image/JPEG,.pdf"
                  onChange={(e) => {
                    setTcImage(e.target.files[0]);
                  }}
                />
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">Birth certificate</label>
                <input
                  className="form-control input1 pt-1"
                  type="file"
                  placeholder=""
                  aria-label="form-control example"
                  accept="image/png,image/jpg,image/png,image/JPEG,.pdf"
                  onChange={(e) => {
                    setBirthCertificateImage(e.target.files[0]);
                  }}
                />
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">Report</label>
                <input
                  className="form-control input1 pt-1"
                  type="file"
                  placeholder=""
                  aria-label="form-control example"
                  accept="image/png,image/jpg,image/png,image/JPEG,.pdf"
                  onChange={(e) => {
                    setReportImage(e.target.files[0]);
                  }}
                />
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">Others</label>
                <input
                  className="form-control input1 pt-1"
                  type="file"
                  placeholder=""
                  aria-label="form-control example"
                  accept="image/png,image/jpg,image/png,image/JPEG,.pdf"
                  onChange={(e) => {
                    setOthersImage(e.target.files[0]);
                  }}
                />
              </div>
            </div>
          </div>
          {/* Document Section Ends */}

          <div className="container-fluid my-3">
            <div className="row px-1 py-1 justify-content-between">
              <div className="col-lg-6">
                <input
                  className="form-check-input mt-1"
                  id="confirmState"
                  type="checkbox"
                  value={true}
                  name="confirmation"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setConfirmationState(e.target.value);
                    } else {
                      setConfirmationState(false);
                    }
                  }}
                />
                <label
                  className="form-check-label font-13 fw-500 ms-1"
                  htmlFor="confirmState"
                >
                  Are you sure to submit ?
                </label>
              </div>

              <div className="col-lg-4 text-center">
                <button
                  className="btn submit-btn w-100"
                  onClick={studentAdmissionSubmitHandler}
                  disabled={!confirmationState}
                >
                  Save & Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}

      <div
        className="modal fade"
        id="siblingModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="siblingModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header py-2">
              <p
                className="modal-title mb-0 font-16 fw-bold"
                id="siblingModalLabel"
              >
                Select Siblings
              </p>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <select
                className="form-select form-select-sm mb-2"
                onChange={(e) => {
                  setSibling1(e.target.value);
                }}
              >
                <option value={""}>Sibling 1</option>
                {admittedStudentsData?.map((item) => (
                  <option key={item.id} value={item.student_id}>
                    {item.student_first_name} {item.student_last_name}{" "}
                    {item.student_id}
                  </option>
                ))}
              </select>
              <select
                className="form-select form-select-sm mb-2"
                onChange={(e) => {
                  setSibling2(e.target.value);
                }}
              >
                <option value={""}>Sibling 2</option>
                {admittedStudentsData
                  ?.filter((item) => {
                    return item.student_id !== (sibling1 || sibling2);
                  })
                  .map((item) => (
                    <option key={item.id} value={item.student_id}>
                      {item.student_first_name} {item.student_last_name}{" "}
                      {item.student_id}
                    </option>
                  ))}
              </select>

              <select
                className="form-select form-select-sm mb-2"
                onChange={(e) => {
                  setSibling3(e.target.value);
                }}
              >
                <option value={""}>Sibling 3</option>
                {admittedStudentsData
                  ?.filter((item) => {
                    return item.student_id !== (sibling1 || sibling2);
                  })
                  .map((item) => (
                    <option key={item.id} value={item.student_id}>
                      {item.student_first_name} {item.student_last_name}{" "}
                      {item.student_id}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ANCHOR Eligible Student Modal */}

      <div
        className="modal fade"
        id="eligibleModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="eligibleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header py-2">
              <p
                className="modal-title mb-0 font-16 fw-bold"
                id="eligibleModalLabel"
              >
                Choose Eligible Student
              </p>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <select
                className="form-select form-select-sm mb-2"
                onChange={(e) => {
                  getEligibleStudentDatabyID(e.target.value);
                }}
              >
                <option value={""}>Choose</option>
                {eligibleStudentsData?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.form_number}, {item.student_first_name}{" "}
                    {item.student_last_name}, {item.applyforclass}
                  </option>
                ))}
              </select>

              {/* <Dropdown
                value={selectID}
                onChange={(e) => setSelectID(e.value)}
                options={eligibleStudentsData}
                optionLabel="form_number"
                placeholder="Select Eligible Student"
                filter
                className="form-select input1 py-0 font-12"
                data-bs-dismiss="modal"
              /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
