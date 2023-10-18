import React, { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Loader } from "../Common/Loader";
import { SessionContext } from "../../context/SessionContext";

import { Toast } from "primereact/toast";
import { ClassContext } from "../../context/ClassContext";

export const AdmissionFormComp = () => {
  // Utils

  const { session } = useContext(SessionContext);
  const { classInfo } = useContext(ClassContext);
  const [loader, setLoader] = useState(false);
  const [residencyStat, setResidencyStat] = useState("Local");

  const [confirmationState, setConfirmationState] = useState(false);

  const [activeSchool, setActiveSchool] = useState(1);

  // Apllicant Perticular States

  // ANCHOR Current Workspace

  const toastTL = useRef(null);

  const [formNumber, setFormNumber] = useState("");
  const [submissionDate, setSubmissionDate] = useState("");
  const [studentFirstName, setStudentFirstName] = useState("");
  const [studentLastName, setStudentLastName] = useState("");
  const [appliedClass, setAppliedClass] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("Chattogram");
  const [nationality, setNationality] = useState("Bangladeshi");
  const [religion, setReligion] = useState("Islam");
  const [birthCertificate, setBirthCertificate] = useState("");
  const [passportNo, setPassportNo] = useState("");
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

  const [fatherImage, setFatherImage] = useState("");
  const [motherImage, setMotherImage] = useState("");
  const [guardian1Image, setGuardian1Image] = useState("");
  const [guardian2Image, setGuardian2Image] = useState("");

  //   Address States

  // Foreign

  const [presentAddress, setPresentAddress] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");

  // Local

  const [presentDistrictLocal, setPresentDistrictLocal] = useState("");
  const [presentCityLocal, setPresentCityLocal] = useState("");
  const [presentStreetLocal, setPresentStreetLocal] = useState("");

  const [permanentDistrictLocal, setPermanentDistrictLocal] = useState("");
  const [permanentCityLocal, setPermanentCityLocal] = useState("");
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

  const [additionalNotes, setAdditionalNotes] = useState("");

  // Global Data

  const [admittedStudentsData, setAdmittedStudentsData] = useState([]);
  const [update, setUpdate] = useState([]);
  const [yn, setYn] = useState(false);

  //   Functions

  const calcAge = (dob) => {
    let date = new Date();
    let currentYear = date.getFullYear();
    let currentMonth = date.getMonth() + 1;
    let birthDate = new Date(dob);
    let birthYear = birthDate.getFullYear();
    let birthMonth = birthDate.getMonth() + 1;

    let years = +currentYear - +birthYear;
    let months = +currentMonth - +birthMonth;

    if (months < 0) {
      years--;
      months = 12 + months;
    }

    return `${+years} years ${+months} months`;
  };

  // Validation Condition

  const conditions = [
    formNumber === "",
    submissionDate === "",
    studentFirstName === "",
    studentLastName === "",
    appliedClass === "",
    dateOfBirth === "",
    age === "",
    gender === "",
    placeOfBirth === "",
    nationality === "",
    religion === "",
    birthCertificate === "",
    passportNo === "",
    fatherContact === "",
    motherContact === "",
    emergencyCon1 === "",
    emergencyRel1 === "",
    emergencySMS1 === "",
  ];

  const fields = [
    "Form Number",
    "Submission Date",
    "Student First Name",
    "Student Last Name",
    "Applied Class",
    "Date of Birth",
    "Age",
    "Gender",
    "Place of Birth",
    "Nationality",
    "Religion",
    "Birth Certificate",
    "Passport",
    "Father Contact",
    "Mother Contact",
    "Emergency Conatct",
    "Emergency Relation",
    "Emergency SMS",
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

  // ANCHOR Form submission function

  function admissionFormSubmit() {
    setLoader(true);

    for (let i = 0; i < conditions.length; i++) {
      if (conditions[i]) {
        setLoader(false);
        toastTL.current.show({
          severity: "error",
          summary: "Error",
          detail: `Fill up the ${fields[i]} field!`,
          life: 2000,
        });
        return false;
      }
    }

    const data = new FormData();

    // Apllicant Perticular Data Append

    data.append("session", session);
    data.append("form_number", formNumber);
    data.append("submission_date", submissionDate);
    data.append("student_first_name", studentFirstName);
    data.append("student_last_name", studentLastName);
    data.append("applyforclass", appliedClass);
    data.append("dob", dateOfBirth);
    data.append("age", age);
    data.append("gender", gender);
    data.append("pob", placeOfBirth);
    data.append("nationality", nationality);
    data.append("religion", religion);
    data.append("birthCertificate", birthCertificate);
    data.append("passport_number", passportNo);
    data.append("student_picture", studentImage);

    //   Academic Background Data Append

    data.append("currentschool", currentSchoolName);
    data.append("sdate", currentSchoolStartDate);
    data.append("sgrade", currentSchoolStartGrade);
    data.append("fdate", currentSchoolEndDate);
    data.append("fgrade", currentSchoolEndGrade);
    data.append("language", currentSchoolInstruction);

    data.append("previousSchool", previousSchoolName1);
    data.append("psdate", previousSchoolStartDate1);
    data.append("psgrade", previousSchoolStartGrade1);
    data.append("pfdate", previousSchoolEndDate1);
    data.append("pfgrade", previousSchoolEndGrade1);
    data.append("planguage", previousSchoolInstruction1);

    data.append("previousSchool1", previousSchoolName2);
    data.append("psdate1", previousSchoolStartDate2);
    data.append("psgrade1", previousSchoolStartGrade2);
    data.append("pfdate1", previousSchoolEndDate2);
    data.append("pfgrade1", previousSchoolEndGrade2);
    data.append("planguage1", previousSchoolInstruction2);

    data.append("previousSchool2", previousSchoolName3);
    data.append("psdate2", previousSchoolStartDate3);
    data.append("psgrade2", previousSchoolStartGrade3);
    data.append("pfdate2", previousSchoolEndDate3);
    data.append("pfgrade2", previousSchoolEndGrade3);
    data.append("planguage2", previousSchoolInstruction3);

    // Medical Condition Data Append

    data.append("physical_disability", physicalDisability);
    data.append("partially_signted", partiallySighted);
    data.append("hearing_imparment", hearingImpairment);
    data.append("mobility_difficulties", mobilityDifficulties);
    data.append("mental_health", mentalDisability);
    data.append("blood_group", bloodGroup);
    data.append("others", otherConditions);
    data.append("mremarks", medRemarks);

    // Parent's & Gaurdian's Particulars Data append

    data.append("father_name", fatherName);
    data.append("father_occupation", fatherJob);
    data.append("father_education", fatherEdu);
    data.append("father_nidPass", fatherNID);
    data.append("father_tin", fatherTIN);

    data.append("mother_name", motherName);
    data.append("mother_occupation", motherJob);
    data.append("mother_education", motherEdu);
    data.append("mother_nidPass", motherNID);
    data.append("mother_tin", motherTIN);

    data.append("guardianName1", guardianName1);
    data.append("grelation1", guardianRelation1);
    data.append("guardianName2", guardianName2);
    data.append("grelation2", guardianRelation2);

    data.append("father_img", fatherImage);
    data.append("mother_img", motherImage);
    data.append("gurdian1_img", guardian1Image);
    data.append("gurdian2_img", guardian2Image);

    // Address Data append

    // Foreign

    data.append("present_address", presentAddress);
    data.append("permanent_address", permanentAddress);

    // Local

    data.append("presentdistrict", presentDistrictLocal);
    data.append("presentcity", presentCityLocal);
    data.append("presentstreet", presentStreetLocal);
    data.append("permanentdistrict", permanentDistrictLocal);
    data.append("permanentcity", permanentCityLocal);
    data.append("permanentstreet", permanentStreetLocal);

    // Contact Data Append

    data.append("father_contact", fatherContact);
    data.append("father_email", fatherEmail);
    data.append("mother_contact", motherContact);
    data.append("mother_email", motherEmail);

    data.append("emergency_contact1", emergencyCon1);
    data.append("sms_contact1", emergencySMS1);
    data.append("relation1", emergencyRel1);

    data.append("emergency_contact2", emergencyCon2);
    data.append("relation2", emergencyRel2);
    data.append("sms_contact2", emergencySMS2);

    // Payment Data append

    data.append("who_will_pay", feePayer);
    data.append("pay_relation", feePayerRelation);
    data.append("employee_student", employeeDesignation);

    // Sibling Data append

    data.append("sibling1", sibling1);
    data.append("sibling2", sibling2);
    data.append("sibling3", sibling3);
    data.append("sibling4", "");
    data.append("sibling5", "");

    // Additional Notes Data append

    data.append("note", additionalNotes);

    fetch(`${import.meta.env.VITE_SERVER}/admissionformsubmit`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setLoader(false);
        toastTL.current.show({
          severity: "success",
          summary: "Success",
          detail: `Form Submitted!`,
          life: 2000,
        });
        resetStates();
      })
      .catch((err) =>
        toastTL.current.show({
          severity: "error",
          summary: "Error",
          detail: `Task Failed! ${err}`,
          life: 2000,
        })
      );
  }

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
      console.error(error);
    }
  };

  const resetStates = () => {
    setUpdate(update + 1);
    setFormNumber("");
    setSubmissionDate("");
    setStudentFirstName("");
    setStudentLastName("");
    setAppliedClass("");
    setDateOfBirth("");
    setAge(0);
    setGender("");
    setPlaceOfBirth("");
    setNationality("Bangladeshi");
    setReligion("Islam");
    setBirthCertificate("");
    setPassportNo("");
    setStudentImage(0);
    setCurrentSchoolName("");
    setCurrentSchoolStartDate("");
    setCurrentSchoolStartGrade("");
    setCurrentSchoolEndDate("");
    setCurrentSchoolEndGrade("");
    setCurrentSchoolInstruction("");

    setPreviousSchoolName1("");
    setPreviousSchoolStartDate1("");
    setPreviousSchoolStartGrade1("");
    setPreviousSchoolEndDate1("");
    setPreviousSchoolEndGrade1("");
    setPreviousSchoolInstruction1("");

    setPreviousSchoolName2("");
    setPreviousSchoolStartDate2("");
    setPreviousSchoolStartGrade2("");
    setPreviousSchoolEndDate2("");
    setPreviousSchoolEndGrade2("");
    setPreviousSchoolInstruction2("");

    setPreviousSchoolName3("");
    setPreviousSchoolStartDate3("");
    setPreviousSchoolStartGrade3("");
    setPreviousSchoolEndDate3("");
    setPreviousSchoolEndGrade3("");
    setPreviousSchoolInstruction3("");

    setPhysicalDisability("No");
    setPartiallySighted("No");
    setHearingImpairment("No");
    setMobilityDifficulties("No");
    setBloodGroup("");
    setOtherConditions("");
    setMedRemarks("");

    setFatherName("");
    setFatherJob("");
    setFatherEdu("");
    setFatherNID("");
    setFatherTIN("");

    setMotherName("");
    setMotherJob("");
    setMotherEdu("");
    setMotherNID("");
    setMotherTIN("");

    setGuardianName1("");
    setGuardianRelation1("");
    setGuardianName2("");
    setGuardianRelation2("");

    setPresentAddress("");
    setPermanentAddress("");
    setPresentDistrictLocal("");
    setPresentCityLocal("");
    setPresentStreetLocal("");

    setPermanentDistrictLocal("");
    setPermanentCityLocal("");
    setPermanentStreetLocal("");

    setFatherContact("");
    setFatherEmail("");
    setMotherContact("");
    setMotherEmail("");

    setEmergencyCon1("");
    setEmergencyRel1("");
    setEmergencySMS1("");

    setEmergencyCon2("");
    setEmergencyRel2("");
    setEmergencySMS2("");

    setFeePayer("");
    setFeePayerRelation("");
    setEmployeeStatus("No");
    setEmployeeDesignation("");

    setSibling1("");
    setSibling2("");
    setSibling3("");

    setAdditionalNotes("");
  };

  useEffect(() => {
    getAdmittedStudentsData();
  }, [update]);

  const handlerChange = (e) => {
    if (e.target.checked) {
      setYn(true);
    } else {
      setYn(false);
    }
  };

  return (
    <>
      <div className="content-body">
        {loader && <Loader />}

        {/* ANCHOR Toast */}
        <Toast ref={toastTL} position="top-right" />

        <div className="d-flex py-2 px-3 border-b align-items-center">
          <p className="header-font">Admission Form</p>
          <Link to={"/"} className=" ms-4 linkdecoration">
            <div className="btn1 px-3 py-1">Choose From Online</div>
          </Link>
        </div>

        <div className="scroll-element">
          {/* Student's particular Start */}

          <div className="d-flex bg1 px-3 mt-2 py-1">
            <p className="text1 mb-0">Applicant's Particulars</p>
          </div>
          <div className="container-fluid">
            <div className="row px-1 py-1">
              <div className="col-lg-3 mb-2">
                <label className="form-label label1">
                  Form Number<span className="text-danger fs-14">*</span>
                </label>
                <input
                  className="form-control input1"
                  type="text"
                  placeholder=""
                  aria-label="form-control example"
                  onChange={(e) => {
                    setFormNumber(e.target.value);
                  }}
                  value={formNumber}
                />
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">
                  Submission Date<span className="text-danger fs-14">*</span>
                </label>
                <input
                  type="date"
                  className="form-control input1"
                  onChange={(e) => {
                    setSubmissionDate(e.target.value);
                  }}
                  value={submissionDate}
                />
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">
                  Student First Name<span className="text-danger fs-14">*</span>
                </label>
                <input
                  className="form-control input1"
                  type="text"
                  placeholder=""
                  aria-label="form-control example"
                  onChange={(e) => {
                    setStudentFirstName(e.target.value);
                  }}
                  value={studentFirstName}
                />
              </div>
              <div className="col-lg-3 mb-2">
                <label className="form-label label1">
                  Student Last Name<span className="text-danger fs-14">*</span>
                </label>
                <input
                  className="form-control input1"
                  type="text"
                  placeholder=""
                  aria-label="form-control example"
                  onChange={(e) => {
                    setStudentLastName(e.target.value);
                  }}
                  value={studentLastName}
                />
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">
                  Applying For Class<span className="text-danger fs-14">*</span>
                </label>

                <select
                  className="form-select input1 py-0"
                  onChange={(e) => {
                    setAppliedClass(e.target.value);
                  }}
                  value={appliedClass}
                >
                  <option selected value={""}>
                    Select
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
                <label className="form-label label1">
                  Date of Birth<span className="text-danger fs-14">*</span>
                </label>
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
                <label className="form-label label1">
                  Gender<span className="text-danger fs-14">*</span>
                </label>
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
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">
                  Place of Birth<span className="text-danger fs-14">*</span>
                </label>
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
                <label className="form-label label1">
                  Nationality<span className="text-danger fs-14">*</span>
                </label>
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
                <label className="form-label label1">
                  Religion<span className="text-danger fs-14">*</span>
                </label>
                <select
                  className="form-select input1 py-0"
                  onChange={(e) => {
                    setReligion(e.target.value);
                  }}
                  value={religion}
                >
                  <option>Islam</option>
                  <option>Hinduism</option>
                  <option>Buddhism</option>
                  <option>Christianity</option>
                </select>
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">
                  Birth Certificate<span className="text-danger fs-14">*</span>
                </label>
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
                <label className="form-label label1">
                  Passport Number<span className="text-danger fs-14">*</span>
                </label>
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
                <label className="form-label label1">Student's Image</label>
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
              {/* Current School */}

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
                      className="form-check-input mt-1"
                      type="radio"
                      value="Others"
                      name="mediumInstruction"
                      checked={
                        currentSchoolInstruction !== "Bangla" &&
                        currentSchoolInstruction !== "English" &&
                        currentSchoolInstruction !== ""
                      }
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

              {/* Previous School 1 */}

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
                      checked={
                        previousSchoolInstruction1 !== "Bangla" &&
                        previousSchoolInstruction1 !== "English" &&
                        previousSchoolInstruction1 !== ""
                      }
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
                          value={previousSchoolEndGrade2}
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
                          checked={
                            previousSchoolInstruction2 !== "Bangla" &&
                            previousSchoolInstruction2 !== "English" &&
                            previousSchoolInstruction2 !== ""
                          }
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
                          checked={
                            previousSchoolInstruction3 !== "Bangla" &&
                            previousSchoolInstruction3 !== "English" &&
                            previousSchoolInstruction3 !== ""
                          }
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
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>O+</option>
                  <option>O-</option>
                  <option>AB+</option>
                  <option>AB-</option>
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
                  value={otherConditions}
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
                  value={medRemarks}
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
                <label className="form-label label1">Father's Name</label>
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
                <label className="form-label label1">Father's Occupation</label>
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
                <label className="form-label label1">Father's Education</label>
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
                    <label className="form-label label1">Father's NID</label>
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
                <label className="form-label label1">Mother's Name</label>
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
                <label className="form-label label1">Mother's Occupation</label>
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
                <label className="form-label label1">Mother's Education</label>
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
                    <label className="form-label label1">Mother's NID</label>
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
                <label className="form-label label1">Gaurdian's Name 1</label>
                <input
                  className="form-control input1"
                  type="text"
                  placeholder=""
                  aria-label="form-control example"
                  onChange={(e) => {
                    setGuardianName1(e.target.value);
                  }}
                  value={guardianName1}
                />
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">Relation 1</label>
                <input
                  className="form-control input1"
                  type="text"
                  placeholder=""
                  aria-label="form-control example"
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

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">Father's Image</label>
                <input
                  className="form-control input1 pt-1"
                  type="file"
                  placeholder=""
                  aria-label="form-control example"
                  onChange={(e) => {
                    setFatherImage(e.target.files[0]);
                  }}
                />
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">Mother's Image</label>
                <input
                  className="form-control input1 pt-1"
                  type="file"
                  placeholder=""
                  aria-label="form-control example"
                  onChange={(e) => {
                    setMotherImage(e.target.files[0]);
                  }}
                />
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">Gaurdian's Image 1</label>
                <input
                  className="form-control input1 pt-1"
                  type="file"
                  placeholder=""
                  aria-label="form-control example"
                  onChange={(e) => {
                    setGuardian1Image(e.target.files[0]);
                  }}
                />
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">Gaurdian's Image 2</label>
                <input
                  className="form-control input1 pt-1"
                  type="file"
                  placeholder=""
                  aria-label="form-control example"
                  onChange={(e) => {
                    setGuardian2Image(e.target.files[0]);
                  }}
                />
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
                    <label className="form-label label1">Present Address</label>
                    <textarea
                      className="form-control"
                      type="text"
                      placeholder=""
                      row="2"
                      aria-label="form-control example"
                      onChange={(e) => {
                        setPresentAddress(e.target.value);
                      }}
                      value={presentAddress}
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
                      value={permanentAddress}
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
                    <label className="form-label label1">Present Address</label>
                    <div className="row">
                      <div className="col-lg-6 mb-2">
                        <select
                          className="form-select input1 py-0"
                          onChange={(e) => {
                            setPresentDistrictLocal(e.target.value);
                          }}
                          value={presentDistrictLocal}
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
                      <div className="col-lg-6 mb-2">
                        <select
                          className="form-select input1 py-0"
                          onChange={(e) => {
                            setPresentCityLocal(e.target.value);
                          }}
                          value={presentCityLocal}
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
                      <div className="col-lg-12">
                        <input
                          className="form-control input1"
                          type="text"
                          placeholder="Street"
                          aria-label="form-control example"
                          onChange={(e) => {
                            setPresentStreetLocal(e.target.value);
                          }}
                          value={presentStreetLocal}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Permanent Address */}

                  <div className="col-lg-6">
                    <label className="form-label label1">
                      Permanent Address
                    </label>
                    <div className="row">
                      <div className="col-lg-6 mb-2">
                        <select
                          className="form-select input1 py-0"
                          onChange={(e) => {
                            setPermanentDistrictLocal(e.target.value);
                          }}
                          value={permanentDistrictLocal}
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
                      <div className="col-lg-6 mb-2">
                        <select
                          className="form-select input1 py-0"
                          onChange={(e) => {
                            setPermanentCityLocal(e.target.value);
                          }}
                          value={permanentCityLocal}
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
                      <div className="col-lg-12">
                        <input
                          className="form-control input1"
                          type="text"
                          placeholder="Street"
                          aria-label="form-control example"
                          onChange={(e) => {
                            setPermanentStreetLocal(e.target.value);
                          }}
                          value={permanentStreetLocal}
                        />
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
                  type="number"
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
                  type="number"
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
                  Emergency Contact 1 (Name)
                  <span className="text-danger fs-14">*</span>
                </label>
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
                <label className="form-label label1">
                  Emergency Contact 2 (Name)
                </label>
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
                      SMS/Contact
                      <span className="text-danger fs-14">*</span>
                    </label>
                    <input
                      className="form-control input1"
                      type="number"
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
                    <label className="form-label label1">SMS/Contact</label>
                    <input
                      className="form-control input1"
                      type="number"
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
                <label className="form-label label1">Relation</label>
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
                      value={employeeDesignation}
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
                    setAdditionalNotes(e.target.value);
                  }}
                  value={additionalNotes}
                ></textarea>
              </div>
            </div>
          </div>

          {/* Note End */}

          <div className="d-flex bg1 px-3 mt-2 py-1">
            <p className="text1 mb-0">Confirmation</p>
          </div>

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
                  onClick={admissionFormSubmit}
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
                value={sibling1}
              >
                <option value={""}>Sibling 1</option>
                {admittedStudentsData?.map((item) => (
                  <option key={item.id} value={item.student_id}>
                    {item.student_first_name} {item.student_last_name} (
                    {item.student_id})
                  </option>
                ))}
              </select>
              <select
                className="form-select form-select-sm mb-2"
                onChange={(e) => {
                  setSibling2(e.target.value);
                }}
                value={sibling2}
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
                value={sibling3}
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
    </>
  );
};
