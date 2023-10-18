import React, { useContext } from "react";
import { Link } from "react-router-dom";

import academic from "../../assets/images/academic.png";
import admission from "../../assets/images/admission.png";
import hifz from "../../assets/images/hifz.png";
import student from "../../assets/images/student.png";

import club from "../../assets/images/club.png";

import fees from "../../assets/images/fees.png";
import income from "../../assets/images/Income.png";
import Expense from "../../assets/images/Expense.png";
import Library from "../../assets/images/Library.png";

import front from "../../assets/images/front.png";
import certificate from "../../assets/images/certificate.png";
import procurement from "../../assets/images/procurement.png";
import inventory from "../../assets/images/inventory.png";
import budget from "../../assets/images/budget.png";
import exam from "../../assets/images/exam.png";
import discount from "../../assets/images/discount.png";
import { UserPrevilegeContext } from "../../context/UserPrevilegeContext";
import { UserRoleContext } from "../../context/UserRoleContext";
import { useEffect } from "react";
import { useState } from "react";

export const SideNav = () => {
  const [userData, setUserData] = useState([]);
  let url = window.location.pathname;

  const { previlegeData } = useContext(UserPrevilegeContext);
  const { user } = useContext(UserRoleContext);

  const admissionrequirementsconditions =
    userData[0]?.create.includes("admissionrequirements") ||
    userData[0]?.read.includes("admissionrequirements") ||
    userData[0]?.update.includes("admissionrequirements") ||
    userData[0]?.dlt.includes("admissionrequirements");

  const contactofemployeesconditions =
    userData[0]?.create.includes("contactofemployees") ||
    userData[0]?.read.includes("contactofemployees") ||
    userData[0]?.update.includes("contactofemployees") ||
    userData[0]?.dlt.includes("contactofemployees");
  const complainboxconditions =
    userData[0]?.create.includes("complainbox") ||
    userData[0]?.read.includes("complainbox") ||
    userData[0]?.update.includes("complainbox") ||
    userData[0]?.dlt.includes("complainbox");

  const postaldispatchconditions =
    userData[0]?.create.includes("postaldispatch") ||
    userData[0]?.read.includes("postaldispatch") ||
    userData[0]?.update.includes("postaldispatch") ||
    userData[0]?.dlt.includes("postaldispatch");

  const postalreceiveconditions =
    userData[0]?.create.includes("postalreceive") ||
    userData[0]?.read.includes("postalreceive") ||
    userData[0]?.update.includes("postalreceive") ||
    userData[0]?.dlt.includes("postalreceive");

  const visitorsbookconditions =
    userData[0]?.create.includes("visitorsbook") ||
    userData[0]?.read.includes("visitorsbook") ||
    userData[0]?.update.includes("visitorsbook") ||
    userData[0]?.dlt.includes("visitorsbook");

  const admissionformconditions =
    userData[0]?.create.includes("admissionform") ||
    userData[0]?.read.includes("admissionform") ||
    userData[0]?.update.includes("admissionform") ||
    userData[0]?.dlt.includes("admissionform");

  const applicantlistconditions =
    userData[0]?.create.includes("applicantlist") ||
    userData[0]?.read.includes("applicantlist") ||
    userData[0]?.update.includes("applicantlist") ||
    userData[0]?.dlt.includes("applicantlist");
  const admissiontestconditions =
    userData[0]?.create.includes("admissiontest") ||
    userData[0]?.read.includes("admissiontest") ||
    userData[0]?.update.includes("admissiontest") ||
    userData[0]?.dlt.includes("admissiontest");

  const eligiblestudentconditions =
    userData[0]?.create.includes("eligible-student") ||
    userData[0]?.read.includes("eligible-student") ||
    userData[0]?.update.includes("eligible-student") ||
    userData[0]?.dlt.includes("eligible-student");

  const studentinfoconditions =
    userData[0]?.create.includes("studentinfo") ||
    userData[0]?.read.includes("studentinfo") ||
    userData[0]?.update.includes("studentinfo") ||
    userData[0]?.dlt.includes("studentinfo");
  const studentadmissionconditions =
    userData[0]?.create.includes("studentadmission") ||
    userData[0]?.read.includes("studentadmission") ||
    userData[0]?.update.includes("studentadmission") ||
    userData[0]?.dlt.includes("studentadmission");

  const categoryconditions =
    userData[0]?.create.includes("category") ||
    userData[0]?.read.includes("category") ||
    userData[0]?.update.includes("category") ||
    userData[0]?.dlt.includes("category");

  const houseconditions =
    userData[0]?.create.includes("house") ||
    userData[0]?.read.includes("house") ||
    userData[0]?.update.includes("house") ||
    userData[0]?.dlt.includes("house");

  const classsectionconditions =
    userData[0]?.create.includes("classsection") ||
    userData[0]?.read.includes("classsection") ||
    userData[0]?.update.includes("classsection") ||
    userData[0]?.dlt.includes("classsection");

  const admitcardgenerateconditions =
    userData[0]?.create.includes("admitcardgenerate") ||
    userData[0]?.read.includes("admitcardgenerate") ||
    userData[0]?.update.includes("admitcardgenerate") ||
    userData[0]?.dlt.includes("admitcardgenerate");

  const exameligibilityconditions =
    userData[0]?.create.includes("exameligibility") ||
    userData[0]?.read.includes("exameligibility") ||
    userData[0]?.update.includes("exameligibility") ||
    userData[0]?.dlt.includes("exameligibility");

  const temppassconditions =
    userData[0]?.create.includes("temppass") ||
    userData[0]?.read.includes("temppass") ||
    userData[0]?.update.includes("temppass") ||
    userData[0]?.dlt.includes("temppass");

  const ecaenrollmentconditions =
    userData[0]?.create.includes("ecaenrollment") ||
    userData[0]?.read.includes("ecaenrollment") ||
    userData[0]?.update.includes("ecaenrollment") ||
    userData[0]?.dlt.includes("ecaenrollment");

  const ecamembersconditions =
    userData[0]?.create.includes("ecamembers") ||
    userData[0]?.read.includes("ecamembers") ||
    userData[0]?.update.includes("ecamembers") ||
    userData[0]?.dlt.includes("ecamembers");

  const hifzenrollmentconditions =
    userData[0]?.create.includes("hifzenrollment") ||
    userData[0]?.read.includes("hifzenrollment") ||
    userData[0]?.update.includes("hifzenrollment") ||
    userData[0]?.dlt.includes("hifzenrollment");

  const hifzmembersconditions =
    userData[0]?.create.includes("hifzmembers") ||
    userData[0]?.read.includes("hifzmembers") ||
    userData[0]?.update.includes("hifzmembers") ||
    userData[0]?.dlt.includes("hifzmembers");

  const librarysellconditions =
    userData[0]?.create.includes("librarysell") ||
    userData[0]?.read.includes("librarysell") ||
    userData[0]?.update.includes("librarysell") ||
    userData[0]?.dlt.includes("librarysell");

  const studentcardgenerateconditions =
    userData[0]?.create.includes("student-card-generate") ||
    userData[0]?.read.includes("student-card-generate") ||
    userData[0]?.update.includes("student-card-generate") ||
    userData[0]?.dlt.includes("student-card-generate");

  const bulkstudentcardgeneratorconditions =
    userData[0]?.create.includes("bulk-student-card-generator") ||
    userData[0]?.read.includes("bulk-student-card-generator") ||
    userData[0]?.update.includes("bulk-student-card-generator") ||
    userData[0]?.dlt.includes("bulk-student-card-generator");

  const programcertificateconditions =
    userData[0]?.create.includes("program-certificate") ||
    userData[0]?.read.includes("program-certificate") ||
    userData[0]?.update.includes("program-certificate") ||
    userData[0]?.dlt.includes("program-certificate");

  const certificatecustomizeconditions =
    userData[0]?.create.includes("certificate-customize") ||
    userData[0]?.read.includes("certificate-customize") ||
    userData[0]?.update.includes("certificate-customize") ||
    userData[0]?.dlt.includes("certificate-customize");

  const feestypeconditions =
    userData[0]?.create.includes("feestype") ||
    userData[0]?.read.includes("feestype") ||
    userData[0]?.update.includes("feestype") ||
    userData[0]?.dlt.includes("feestype");

  const feesinfoconditions =
    userData[0]?.create.includes("feesinfo") ||
    userData[0]?.read.includes("feesinfo") ||
    userData[0]?.update.includes("feesinfo") ||
    userData[0]?.dlt.includes("feesinfo");

  const enrollmentfeesconditions =
    userData[0]?.create.includes("enrollmentfees") ||
    userData[0]?.read.includes("enrollmentfees") ||
    userData[0]?.update.includes("enrollmentfees") ||
    userData[0]?.dlt.includes("enrollmentfees");

  const feesforwardconditions =
    userData[0]?.create.includes("fees-forward") ||
    userData[0]?.read.includes("fees-forward") ||
    userData[0]?.update.includes("fees-forward") ||
    userData[0]?.dlt.includes("fees-forward");

  const collectfeesconditions =
    userData[0]?.create.includes("collectfees") ||
    userData[0]?.read.includes("collectfees") ||
    userData[0]?.update.includes("collectfees") ||
    userData[0]?.dlt.includes("collectfees");
  const feesapprovalconditions =
    userData[0]?.create.includes("feesapproval") ||
    userData[0]?.read.includes("feesapproval") ||
    userData[0]?.update.includes("feesapproval") ||
    userData[0]?.dlt.includes("feesapproval");

  const discounttypeconditions =
    userData[0]?.create.includes("discounttype") ||
    userData[0]?.read.includes("discounttype") ||
    userData[0]?.update.includes("discounttype") ||
    userData[0]?.dlt.includes("discounttype");

  const discountassignconditions =
    userData[0]?.create.includes("discountassign") ||
    userData[0]?.read.includes("discountassign") ||
    userData[0]?.update.includes("discountassign") ||
    userData[0]?.dlt.includes("discountassign");

  const financialaidconditions =
    userData[0]?.create.includes("financialaid") ||
    userData[0]?.read.includes("financialaid") ||
    userData[0]?.update.includes("financialaid") ||
    userData[0]?.dlt.includes("financialaid");

  const addexpenseconditions =
    userData[0]?.create.includes("addexpense") ||
    userData[0]?.read.includes("addexpense") ||
    userData[0]?.update.includes("addexpense") ||
    userData[0]?.dlt.includes("addexpense");

  const expenseheadconditions =
    userData[0]?.create.includes("expensehead") ||
    userData[0]?.read.includes("expensehead") ||
    userData[0]?.update.includes("expensehead") ||
    userData[0]?.dlt.includes("expensehead");

  const approveexpenseconditions =
    userData[0]?.create.includes("approveexpense") ||
    userData[0]?.read.includes("approveexpense") ||
    userData[0]?.update.includes("approveexpense") ||
    userData[0]?.dlt.includes("approveexpense");

  const studentincomeconditions =
    userData[0]?.create.includes("studentincome") ||
    userData[0]?.read.includes("studentincome") ||
    userData[0]?.update.includes("studentincome") ||
    userData[0]?.dlt.includes("studentincome");

  const generalincomeconditions =
    userData[0]?.create.includes("generalincome") ||
    userData[0]?.read.includes("generalincome") ||
    userData[0]?.update.includes("generalincome") ||
    userData[0]?.dlt.includes("generalincome");

  const incomeheadconditions =
    userData[0]?.create.includes("incomehead") ||
    userData[0]?.read.includes("incomehead") ||
    userData[0]?.update.includes("incomehead") ||
    userData[0]?.dlt.includes("incomehead");

  const approveincomeconditions =
    userData[0]?.create.includes("approveincome") ||
    userData[0]?.read.includes("approveincome") ||
    userData[0]?.update.includes("approveincome") ||
    userData[0]?.dlt.includes("approveincome");

  const productstudentconditions =
    userData[0]?.create.includes("product-student") ||
    userData[0]?.read.includes("product-student") ||
    userData[0]?.update.includes("product-student") ||
    userData[0]?.dlt.includes("product-student");

  const productaddconditions =
    userData[0]?.create.includes("productadd") ||
    userData[0]?.read.includes("productadd") ||
    userData[0]?.update.includes("productadd") ||
    userData[0]?.dlt.includes("productadd");
  const productcategoryconditions =
    userData[0]?.create.includes("productcategory") ||
    userData[0]?.read.includes("productcategory") ||
    userData[0]?.update.includes("productcategory") ||
    userData[0]?.dlt.includes("productcategory");
  const grnListconditions =
    userData[0]?.create.includes("GRNList") ||
    userData[0]?.read.includes("GRNList") ||
    userData[0]?.update.includes("GRNList") ||
    userData[0]?.dlt.includes("GRNList");

  const grnconditions =
    userData[0]?.create.includes("GRN") ||
    userData[0]?.read.includes("GRN") ||
    userData[0]?.update.includes("GRN") ||
    userData[0]?.dlt.includes("GRN");

  const mdrListconditions =
    userData[0]?.create.includes("MDRList") ||
    userData[0]?.read.includes("MDRList") ||
    userData[0]?.update.includes("MDRList") ||
    userData[0]?.dlt.includes("MDRList");

  const mdrconditions =
    userData[0]?.create.includes("MDR") ||
    userData[0]?.read.includes("MDR") ||
    userData[0]?.update.includes("MDR") ||
    userData[0]?.dlt.includes("MDR");

  const makerequisitionconditions =
    userData[0]?.create.includes("makerequisition") ||
    userData[0]?.read.includes("makerequisition") ||
    userData[0]?.update.includes("makerequisition") ||
    userData[0]?.dlt.includes("makerequisition");

  const requisitionlistconditions =
    userData[0]?.create.includes("requisitionlist") ||
    userData[0]?.read.includes("requisitionlist") ||
    userData[0]?.update.includes("requisitionlist") ||
    userData[0]?.dlt.includes("requisitionlist");

  const suppliersconditions =
    userData[0]?.create.includes("suppliers") ||
    userData[0]?.read.includes("suppliers") ||
    userData[0]?.update.includes("suppliers") ||
    userData[0]?.dlt.includes("suppliers");
  const csgenerateconditions =
    userData[0]?.create.includes("csgenerate") ||
    userData[0]?.read.includes("csgenerate") ||
    userData[0]?.update.includes("csgenerate") ||
    userData[0]?.dlt.includes("csgenerate");
  const cslistconditions =
    userData[0]?.create.includes("cslist") ||
    userData[0]?.read.includes("cslist") ||
    userData[0]?.update.includes("cslist") ||
    userData[0]?.dlt.includes("cslist");
  const generateorderconditions =
    userData[0]?.create.includes("generateorder") ||
    userData[0]?.read.includes("generateorder") ||
    userData[0]?.update.includes("generateorder") ||
    userData[0]?.dlt.includes("generateorder");

  const orderlistconditions =
    userData[0]?.create.includes("orderlist") ||
    userData[0]?.read.includes("orderlist") ||
    userData[0]?.update.includes("orderlist") ||
    userData[0]?.dlt.includes("orderlist");

  const makefrconditions =
    userData[0]?.create.includes("makefr") ||
    userData[0]?.read.includes("makefr") ||
    userData[0]?.update.includes("makefr") ||
    userData[0]?.dlt.includes("makefr");

  const frlistconditions =
    userData[0]?.create.includes("fr-list") ||
    userData[0]?.read.includes("fr-list") ||
    userData[0]?.update.includes("fr-list") ||
    userData[0]?.dlt.includes("fr-list");
  const makespconditions =
    userData[0]?.create.includes("makesp") ||
    userData[0]?.read.includes("makesp") ||
    userData[0]?.update.includes("makesp") ||
    userData[0]?.dlt.includes("makesp");
  const splistconditions =
    userData[0]?.create.includes("sp-list") ||
    userData[0]?.read.includes("sp-list") ||
    userData[0]?.update.includes("sp-list") ||
    userData[0]?.dlt.includes("sp-list");

  const audittrialconditions =
    userData[0]?.create.includes("audittrial") ||
    userData[0]?.read.includes("audittrial") ||
    userData[0]?.update.includes("audittrial") ||
    userData[0]?.dlt.includes("audittrial");

  const budgetlistconditions =
    userData[0]?.create.includes("budgetlist") ||
    userData[0]?.read.includes("budgetlist") ||
    userData[0]?.update.includes("budgetlist") ||
    userData[0]?.dlt.includes("budgetlist");
  const makebudgetconditions =
    userData[0]?.create.includes("makebudget") ||
    userData[0]?.read.includes("makebudget") ||
    userData[0]?.update.includes("makebudget") ||
    userData[0]?.dlt.includes("makebudget");

  const departmentconditions =
    userData[0]?.create.includes("department") ||
    userData[0]?.read.includes("department") ||
    userData[0]?.update.includes("department") ||
    userData[0]?.dlt.includes("department");
  const designationconditions =
    userData[0]?.create.includes("designation") ||
    userData[0]?.read.includes("designation") ||
    userData[0]?.update.includes("designation") ||
    userData[0]?.dlt.includes("designation");

  // Combined Conditions

  const frontOfcConArr = [
    "admissionrequirements",
    "contactofemployees",
    "complainbox",
    "postaldispatch",
    "postalreceive",
    "visitorsbook",
  ];

  const frontOfcConditions = frontOfcConArr.every((i) =>
    userData[0]?.read.includes(i)
  );

  const addProcessConArr = [
    "admissionform",
    "applicantlist",
    "admissiontest",
    "eligible-student",
  ];

  const admissionProcessConditions = addProcessConArr.every((i) =>
    userData[0]?.read.includes(i)
  );

  const stdInfoConArr = [
    "studentinfo",
    "studentadmission",
    "category",
    "house",
  ];

  const studentInfoConditions = stdInfoConArr.every((i) =>
    userData[0]?.read.includes(i)
  );

  const academicConArr = ["classsection"];

  const academicConditions = academicConArr.every((i) =>
    userData[0]?.read.includes(i)
  );

  const examConArr = ["admitcardgenerate", "exameligibility", "temppass"];

  const examinationConditions = examConArr.every((i) =>
    userData[0]?.read.includes(i)
  );

  const ecaConArr = ["ecaenrollment", "ecamembers"];

  const ecaConditions = ecaConArr.every((i) => userData[0]?.read.includes(i));

  const hifzConArr = ["hifzenrollment", "hifzmembers"];

  const hifzConditions = hifzConArr.every((i) => userData[0]?.read.includes(i));

  const libraryConArr = ["librarysell"];

  const libraryConditions = libraryConArr.every((i) =>
    userData[0]?.read.includes(i)
  );

  const certificationConArr = [
    "student-card-generate",
    "bulk-student-card-generator",
    "program-certificate",
    "certificate-customize",
  ];

  const certificationConditions = certificationConArr.every((i) =>
    userData[0]?.read.includes(i)
  );

  const feesCollectionConArr = [
    "feestype",
    "feesinfo",
    "enrollmentfees",
    "fees-forward",
    "collectfees",
    "feesapproval",
  ];

  const feesCollectionConditions = feesCollectionConArr.every((i) =>
    userData[0]?.read.includes(i)
  );

  const feesDiscountConArr = ["discounttype", "discountassign", "financialaid"];

  const feesDiscountConditions = feesDiscountConArr.every((i) =>
    userData[0]?.read.includes(i)
  );

  const expensesConArr = ["addexpense", "expensehead", "approveexpense"];

  const expensesConditions = expensesConArr.every((i) =>
    userData[0]?.read.includes(i)
  );

  const incomeConArr = [
    "studentincome",
    "generalincome",
    "incomehead",
    "approveincome",
  ];

  const incomeConditions = incomeConArr.every((i) =>
    userData[0]?.read.includes(i)
  );

  const storeInvConArr = [
    "product-student",
    "productadd",
    "productcategory",
    "GRNList",
    "GRN",
    "MDRList",
    "MDR",
  ];

  const storeInvConditions = storeInvConArr.every((i) =>
    userData[0]?.read.includes(i)
  );

  const procurementConArr = [
    "makerequisition",
    "requisitionlist",
    "suppliers",
    "csgenerate",
    "cslist",
    "generateorder",
    "orderlist",
    "makefr",
    "fr-list",
    "makesp",
    "sp-list",
    "audittrial",
  ];

  const procurementConditions = procurementConArr.every((i) =>
    userData[0]?.read.includes(i)
  );

  const budgetConArr = ["budgetlist", "makebudget"];

  const budgetConditions = budgetConArr.every((i) =>
    userData[0]?.read.includes(i)
  );

  const hrConArr = ["department", "designation"];

  const hrConditions = hrConArr.every((i) => userData[0]?.read.includes(i));

  useEffect(() => {
    setUserData(
      previlegeData?.filter((item) => {
        return item.role == user;
      })
    );
  }, [previlegeData, user]);

  return (
    <>
      <div className="scroll-bar-wrap">
        <div className="scroll-box bg-white rounded">
          {/* ANCHOR Front Office */}

          {frontOfcConditions && (
            <div className="list-group panel sideitem rounded-0 ">
              <a
                href="#navf"
                className="list-group-item px-3"
                data-bs-toggle="collapse"
                data-bs-parent="#MainMenu"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img src={front} className="snavicon" />
                    <p className="mb-0 font-13 ms-2 fw-500">Front Office</p>
                  </div>
                  <i className="fa-solid fa-chevron-down font-12"></i>
                </div>
              </a>
              <div className="collapse " id="navf">
                {admissionrequirementsconditions && (
                  <>
                    <div
                      className={
                        url == "/admissionrequirements"
                          ? "py-2 px-3 mb-1 activenav"
                          : " py-2 px-3 mb-1 bactive"
                      }
                    >
                      <Link
                        to={"/admissionrequirements"}
                        className="linkdecoration navtext px-2 d-flex align-items-center"
                      >
                        <i className="fa-solid fa-angle-right font-12"></i>
                        <p className="mb-0 font-12 ms-2">
                          Admission Requirements
                        </p>
                      </Link>
                    </div>
                  </>
                )}

                {contactofemployeesconditions && (
                  <div
                    className={
                      url == "/contactofemployees"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/contactofemployees"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Employee Contact</p>
                    </Link>
                  </div>
                )}

                {complainboxconditions && (
                  <div
                    className={
                      url == "/complainbox"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/complainbox"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Complain Box</p>
                    </Link>
                  </div>
                )}

                {postaldispatchconditions && (
                  <div
                    className={
                      url == "/postaldispatch"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/postaldispatch"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Postal Dispatch</p>
                    </Link>
                  </div>
                )}

                {postalreceiveconditions && (
                  <div
                    className={
                      url == "/postalreceive"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/postalreceive"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Postal Receive</p>
                    </Link>
                  </div>
                )}

                {visitorsbookconditions && (
                  <div
                    className={
                      url == "/visitorsbook"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/visitorsbook"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Visitor's Book</p>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ANCHOR Admission */}

          {admissionProcessConditions && (
            <div className="list-group panel sideitem rounded-0 ">
              <a
                href="#nav1"
                className="list-group-item px-3"
                data-bs-toggle="collapse"
                data-bs-parent="#MainMenu"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img src={admission} className="snavicon" />
                    <p className="mb-0 font-13 ms-2 fw-500">
                      Admission Process
                    </p>
                  </div>
                  <i className="fa-solid fa-chevron-down font-12"></i>
                </div>
              </a>
              <div className="collapse " id="nav1">
                <div
                  className={
                    url == "/dashboard"
                      ? "py-2 px-3 mb-1 activenav"
                      : " py-2 px-3 mb-1 bactive"
                  }
                >
                  <Link
                    to={"/dashboard"}
                    className="linkdecoration navtext px-2 d-flex align-items-center"
                  >
                    <i className="fa-solid fa-angle-right font-12"></i>
                    <p className="mb-0 font-12 ms-2">Online Applicant</p>
                  </Link>
                </div>

                {admissionformconditions && (
                  <div
                    className={
                      url == "/admissionform"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/admissionform"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Admission Form</p>
                    </Link>
                  </div>
                )}

                {applicantlistconditions && (
                  <div
                    className={
                      url == "/applicantlist"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/applicantlist"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Applicant List</p>
                    </Link>
                  </div>
                )}

                {admissiontestconditions && (
                  <div
                    className={
                      url == "/admissiontest"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/admissiontest"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Admission Test</p>
                    </Link>
                  </div>
                )}

                {eligiblestudentconditions && (
                  <div
                    className={
                      url == "/eligible-student"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/eligible-student"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Eligible Student</p>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ANCHOR Student Information */}

          {studentInfoConditions && (
            <div className="list-group panel sideitem rounded-0 ">
              <a
                href="#nav2"
                className="list-group-item px-3"
                data-bs-toggle="collapse"
                data-bs-parent="#MainMenu"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img src={student} className="snavicon" />
                    <p className="mb-0 font-13 ms-2 fw-500">
                      Student Information
                    </p>
                  </div>
                  <i className="fa-solid fa-chevron-down font-12"></i>
                </div>
              </a>
              <div className="collapse " id="nav2">
                {studentinfoconditions && (
                  <div
                    className={
                      url == "/studentinfo"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/studentinfo"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Student Details</p>
                    </Link>
                  </div>
                )}

                {studentadmissionconditions && (
                  <div
                    className={
                      url == "/studentadmission"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/studentadmission"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Student Admission</p>
                    </Link>
                  </div>
                )}

                {categoryconditions && (
                  <div
                    className={
                      url == "/category"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/category"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Student Category</p>
                    </Link>
                  </div>
                )}

                {houseconditions && (
                  <div
                    className={
                      url == "/house"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/house"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Student House</p>
                    </Link>
                  </div>
                )}

                <div
                  className={
                    url == "/siblinginfo"
                      ? "py-2 px-3 mb-1 activenav"
                      : " py-2 px-3 mb-1 bactive"
                  }
                >
                  <Link
                    to={"/siblinginfo"}
                    className="linkdecoration navtext px-2 d-flex align-items-center"
                  >
                    <i className="fa-solid fa-angle-right font-12"></i>
                    <p className="mb-0 font-12 ms-2">Sibling List</p>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* ANCHOR Academics */}

          {academicConditions && (
            <div className="list-group panel sideitem rounded-0 ">
              <a
                href="#nav3"
                className="list-group-item px-3"
                data-bs-toggle="collapse"
                data-bs-parent="#MainMenu"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img src={academic} className="snavicon" />
                    <p className="mb-0 font-13 ms-2 fw-500">Academic</p>
                  </div>
                  <i className="fa-solid fa-chevron-down font-12"></i>
                </div>
              </a>
              <div className="collapse " id="nav3">
                {classsectionconditions && (
                  <div
                    className={
                      url == "/classsection"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/classsection"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Class & Section</p>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {examinationConditions && (
            <div className="list-group panel sideitem rounded-0 ">
              <a
                href="#navexam"
                className="list-group-item px-3"
                data-bs-toggle="collapse"
                data-bs-parent="#MainMenu"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img src={exam} className="snavicon" />
                    <p className="mb-0 font-13 ms-2 fw-500">Examination</p>
                  </div>
                  <i className="fa-solid fa-chevron-down font-12"></i>
                </div>
              </a>
              <div className="collapse " id="navexam">
                {admitcardgenerateconditions && (
                  <div
                    className={
                      url == "/admitcardgenerate"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/admitcardgenerate"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Admit Card Generate</p>
                    </Link>
                  </div>
                )}

                {exameligibilityconditions && (
                  <div
                    className={
                      url == "/exameligibility"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/exameligibility"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Exam Eligibility</p>
                    </Link>
                  </div>
                )}

                {temppassconditions && (
                  <div
                    className={
                      url == "/temppass"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/temppass"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Temporary Pass</p>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ANCHOR ECA */}

          {ecaConditions && (
            <div className="list-group panel sideitem rounded-0 ">
              <a
                href="#nav4"
                className="list-group-item px-3"
                data-bs-toggle="collapse"
                data-bs-parent="#MainMenu"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img src={club} className="snavicon" />
                    <p className="mb-0 font-13 ms-2 fw-500">ECA & Club</p>
                  </div>
                  <i className="fa-solid fa-chevron-down font-12"></i>
                </div>
              </a>
              <div className="collapse " id="nav4">
                {ecaenrollmentconditions && (
                  <div
                    className={
                      url == "/ecaenrollment"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/ecaenrollment"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">ECA Enrollment</p>
                    </Link>
                  </div>
                )}

                {ecamembersconditions && (
                  <div
                    className={
                      url == "/ecamembers"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/ecamembers"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">ECA Members</p>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ANCHOR Hifz */}

          {hifzConditions && (
            <div className="list-group panel sideitem rounded-0 ">
              <a
                href="#nav5"
                className="list-group-item px-3"
                data-bs-toggle="collapse"
                data-bs-parent="#MainMenu"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img src={hifz} className="snavicon" />
                    <p className="mb-0 font-13 ms-2 fw-500">Hifz</p>
                  </div>
                  <i className="fa-solid fa-chevron-down font-12"></i>
                </div>
              </a>
              <div className="collapse " id="nav5">
                {hifzenrollmentconditions && (
                  <div
                    className={
                      url == "/hifzenrollment"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/hifzenrollment"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Hifz Enrollment</p>
                    </Link>
                  </div>
                )}

                {hifzmembersconditions && (
                  <div
                    className={
                      url == "/hifzmembers"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/hifzmembers"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Hifz Members</p>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ANCHOR Library */}

          {libraryConditions && (
            <div className="list-group panel sideitem rounded-0 ">
              <a
                href="#nav12"
                className="list-group-item px-3"
                data-bs-toggle="collapse"
                data-bs-parent="#MainMenu"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img src={Library} className="snavicon" />
                    <p className="mb-0 font-13 ms-2 fw-500">Library</p>
                  </div>
                  <i className="fa-solid fa-chevron-down font-12"></i>
                </div>
              </a>
              <div className="collapse " id="nav12">
                {librarysellconditions && (
                  <div
                    className={
                      url == "/librarysell"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/librarysell"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Library Sell</p>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ANCHOR Certifications */}

          {certificationConditions && (
            <div className="list-group panel sideitem rounded-0 ">
              <a
                href="#nav13"
                className="list-group-item px-3"
                data-bs-toggle="collapse"
                data-bs-parent="#MainMenu"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img src={certificate} className="snavicon" />
                    <p className="mb-0 font-13 ms-2 fw-500">Certification</p>
                  </div>
                  <i className="fa-solid fa-chevron-down font-12"></i>
                </div>
              </a>
              <div className="collapse " id="nav13">
                {studentcardgenerateconditions && (
                  <div
                    className={
                      url == "/student-card-generate"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/student-card-generate"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">ID Card Generate</p>
                    </Link>
                  </div>
                )}

                {certificatecustomizeconditions && (
                  <div
                    className={
                      url == "/tc-certificate-application"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/tc-certificate-application"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">TC Application</p>
                    </Link>
                  </div>
                )}

                {programcertificateconditions && (
                  <div
                    className={
                      url == "/program-certificate"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/program-certificate"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Program Certificate</p>
                    </Link>
                  </div>
                )}

                {certificatecustomizeconditions && (
                  <div
                    className={
                      url == "/certificate-customize"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/certificate-customize"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Certificate Customize</p>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ANCHOR Fees Collection */}

          {feesCollectionConditions && (
            <div className="list-group panel sideitem rounded-0 ">
              <a
                href="#nav6"
                className="list-group-item px-3"
                data-bs-toggle="collapse"
                data-bs-parent="#MainMenu"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img src={fees} className="snavicon" />
                    <p className="mb-0 font-13 ms-2 fw-500">Fees Collection</p>
                  </div>
                  <i className="fa-solid fa-chevron-down font-12"></i>
                </div>
              </a>
              <div className="collapse " id="nav6">
                {feestypeconditions && (
                  <div
                    className={
                      url == "/feestype"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/feestype"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Fees Type</p>
                    </Link>
                  </div>
                )}

                {feesinfoconditions && (
                  <div
                    className={
                      url == "/feesinfo"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/feesinfo"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Fees Info</p>
                    </Link>
                  </div>
                )}

                {enrollmentfeesconditions && (
                  <div
                    className={
                      url == "/enrollmentfees"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/enrollmentfees"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Enrollment Fees</p>
                    </Link>
                  </div>
                )}

                {feesforwardconditions && (
                  <div
                    className={
                      url == "/fees-forward"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/fees-forward"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Fees Forward</p>
                    </Link>
                  </div>
                )}

                {collectfeesconditions && (
                  <div
                    className={
                      url == "/collectfees"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/collectfees"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Collect Fees</p>
                    </Link>
                  </div>
                )}

                {feesapprovalconditions && (
                  <div
                    className={
                      url == "/feesapproval"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/feesapproval"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Fees Approval</p>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ANCHOR Fees Discount */}

          {feesDiscountConditions && (
            <div className="list-group panel sideitem rounded-0 ">
              <a
                href="#navDiscount"
                className="list-group-item px-3"
                data-bs-toggle="collapse"
                data-bs-parent="#MainMenu"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img src={discount} className="snavicon" />
                    <p className="mb-0 font-13 ms-2 fw-500">Fees Discount</p>
                  </div>
                  <i className="fa-solid fa-chevron-down font-12"></i>
                </div>
              </a>
              <div className="collapse " id="navDiscount">
                {discounttypeconditions && (
                  <div
                    className={
                      url == "/discounttype"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/discounttype"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Discount Type</p>
                    </Link>
                  </div>
                )}

                {discountassignconditions && (
                  <div
                    className={
                      url == "/discountassign"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/discountassign"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Discount Assign</p>
                    </Link>
                  </div>
                )}

                {financialaidconditions && (
                  <div
                    className={
                      url == "/financialaid"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/financialaid"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Financial Aid</p>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ANCHOR Expenses */}

          {expensesConditions && (
            <div className="list-group panel sideitem rounded-0 ">
              <a
                href="#nav8"
                className="list-group-item px-3"
                data-bs-toggle="collapse"
                data-bs-parent="#MainMenu"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img src={Expense} className="snavicon" />
                    <p className="mb-0 font-13 ms-2 fw-500">Expenses</p>
                  </div>
                  <i className="fa-solid fa-chevron-down font-12"></i>
                </div>
              </a>
              <div className="collapse " id="nav8">
                {addexpenseconditions && (
                  <div
                    className={
                      url == "/addexpense"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/addexpense"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Add Expense</p>
                    </Link>
                  </div>
                )}

                {expenseheadconditions && (
                  <div
                    className={
                      url == "/expensehead"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/expensehead"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Expense Head</p>
                    </Link>
                  </div>
                )}

                {approveexpenseconditions && (
                  <div
                    className={
                      url == "/approveexpense"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/approveexpense"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Approve Expense</p>
                    </Link>
                  </div>
                )}
                {approveexpenseconditions && (
                  <div
                    className={
                      url == "/petty-cash"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/petty-cash"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Patty Cash</p>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ANCHOR Income */}

          {incomeConditions && (
            <div className="list-group panel sideitem rounded-0 ">
              <a
                href="#nav9"
                className="list-group-item px-3"
                data-bs-toggle="collapse"
                data-bs-parent="#MainMenu"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img src={income} className="snavicon" />
                    <p className="mb-0 font-13 ms-2 fw-500">Income</p>
                  </div>
                  <i className="fa-solid fa-chevron-down font-12"></i>
                </div>
              </a>
              <div className="collapse " id="nav9">
                {studentincomeconditions && (
                  <div
                    className={
                      url == "/studentincome"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/studentincome"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Student Income</p>
                    </Link>
                  </div>
                )}

                {generalincomeconditions && (
                  <div
                    className={
                      url == "/generalincome"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/generalincome"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">General Income</p>
                    </Link>
                  </div>
                )}

                {incomeheadconditions && (
                  <div
                    className={
                      url == "/incomehead"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/incomehead"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Income Head</p>
                    </Link>
                  </div>
                )}

                {approveincomeconditions && (
                  <div
                    className={
                      url == "/approveincome"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/approveincome"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Approve Income</p>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ANCHOR Store & Inventory */}

          {storeInvConditions && (
            <div className="list-group panel sideitem rounded-0 ">
              <a
                href="#nav10"
                className="list-group-item px-3"
                data-bs-toggle="collapse"
                data-bs-parent="#MainMenu"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img src={inventory} className="snavicon" />
                    <p className="mb-0 font-13 ms-2 fw-500">
                      Store & Inventory
                    </p>
                  </div>
                  <i className="fa-solid fa-chevron-down font-12"></i>
                </div>
              </a>
              <div className="collapse " id="nav10">
                {productstudentconditions && (
                  <div
                    className={
                      url == "/product-student"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/product-student"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Product Student</p>
                    </Link>
                  </div>
                )}

                {productaddconditions && (
                  <div
                    className={
                      url == "/productadd"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/productadd"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Product General</p>
                    </Link>
                  </div>
                )}

                {productcategoryconditions && (
                  <div
                    className={
                      url == "/productcategory"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/productcategory"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Product Category</p>
                    </Link>
                  </div>
                )}

                {grnListconditions && (
                  <div
                    className={
                      url == "/GRNList"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/GRNList"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">GRN List</p>
                    </Link>
                  </div>
                )}

                {grnconditions && (
                  <div
                    className={
                      url == "/GRN"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/GRN"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Make GRN</p>
                    </Link>
                  </div>
                )}

                {mdrListconditions && (
                  <div
                    className={
                      url == "/MDRList"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/MDRList"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">MDR List</p>
                    </Link>
                  </div>
                )}

                {mdrconditions && (
                  <div
                    className={
                      url == "/MDR"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/MDR"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Make MDR</p>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ANCHOR Procurement */}

          {procurementConditions && (
            <div className="list-group panel sideitem rounded-0 ">
              <a
                href="#nav11"
                className="list-group-item px-3"
                data-bs-toggle="collapse"
                data-bs-parent="#MainMenu"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img src={procurement} className="snavicon" />
                    <p className="mb-0 font-13 ms-2 fw-500">Procurement</p>
                  </div>
                  <i className="fa-solid fa-chevron-down font-12"></i>
                </div>
              </a>
              <div className="collapse " id="nav11">
                {makerequisitionconditions && (
                  <div
                    className={
                      url == "/makerequisition"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/makerequisition"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Make Requisition</p>
                    </Link>
                  </div>
                )}
                {requisitionlistconditions && (
                  <div
                    className={
                      url == "/requisitionlist"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/requisitionlist"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Requisition List</p>
                    </Link>
                  </div>
                )}
                {suppliersconditions && (
                  <div
                    className={
                      url == "/suppliers"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/suppliers"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Suppliers</p>
                    </Link>
                  </div>
                )}
                {csgenerateconditions && (
                  <div
                    className={
                      url == "/csgenerate"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/csgenerate"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">CS Generation</p>
                    </Link>
                  </div>
                )}
                {cslistconditions && (
                  <div
                    className={
                      url == "/cslist"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/cslist"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">CS List</p>
                    </Link>
                  </div>
                )}
                {generateorderconditions && (
                  <div
                    className={
                      url == "/generateorder"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/generateorder"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Generate Order</p>
                    </Link>
                  </div>
                )}
                {orderlistconditions && (
                  <div
                    className={
                      url == "/orderlist"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/orderlist"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Order List</p>
                    </Link>
                  </div>
                )}
                {makefrconditions && (
                  <div
                    className={
                      url == "/makefr"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/makefr"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Make FR</p>
                    </Link>
                  </div>
                )}
                {frlistconditions && (
                  <div
                    className={
                      url == "/fr-list"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/fr-list"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">FR List</p>
                    </Link>
                  </div>
                )}
                {makespconditions && (
                  <div
                    className={
                      url == "/makesp"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/makesp"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Make SP</p>
                    </Link>
                  </div>
                )}
                {splistconditions && (
                  <div
                    className={
                      url == "/sp-list"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/sp-list"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">SP List</p>
                    </Link>
                  </div>
                )}
                {audittrialconditions && (
                  <div
                    className={
                      url == "/audittrial"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/audittrial"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Audit Trial</p>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Budget  */}

          {budgetConditions && (
            <div className="list-group panel sideitem rounded-0 ">
              <a
                href="#navbgt"
                className="list-group-item px-3"
                data-bs-toggle="collapse"
                data-bs-parent="#MainMenu"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img src={budget} className="snavicon" />
                    <p className="mb-0 font-13 ms-2 fw-500">Budget</p>
                  </div>
                  <i className="fa-solid fa-chevron-down font-12"></i>
                </div>
              </a>
              <div className="collapse " id="navbgt">
                {budgetlistconditions && (
                  <div
                    className={
                      url == "/budgetlist"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/budgetlist"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Budget List</p>
                    </Link>
                  </div>
                )}
                {makebudgetconditions && (
                  <div
                    className={
                      url == "/makebudget"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/makebudget"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Make Budget</p>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ANCHOR HR */}
          {hrConditions && (
            <div className="list-group panel sideitem rounded-0 ">
              <a
                href="#hr"
                className="list-group-item px-3"
                data-bs-toggle="collapse"
                data-bs-parent="#MainMenu"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img src={budget} className="snavicon" />
                    <p className="mb-0 font-13 ms-2 fw-500">HR</p>
                  </div>
                  <i className="fa-solid fa-chevron-down font-12"></i>
                </div>
              </a>
              <div className="collapse " id="hr">
                {departmentconditions && (
                  <div
                    className={
                      url == "/department"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/department"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Department</p>
                    </Link>
                  </div>
                )}
                {designationconditions && (
                  <div
                    className={
                      url == "/designation"
                        ? "py-2 px-3 mb-1 activenav"
                        : " py-2 px-3 mb-1 bactive"
                    }
                  >
                    <Link
                      to={"/designation"}
                      className="linkdecoration navtext px-2 d-flex align-items-center"
                    >
                      <i className="fa-solid fa-angle-right font-12"></i>
                      <p className="mb-0 font-12 ms-2">Designation</p>
                    </Link>
                  </div>
                )}

                <div
                  className={
                    url == "/staffinfo"
                      ? "py-2 px-3 mb-1 activenav"
                      : " py-2 px-3 mb-1 bactive"
                  }
                >
                  <Link
                    to={"/staffinfo"}
                    className="linkdecoration navtext px-2 d-flex align-items-center"
                  >
                    <i className="fa-solid fa-angle-right font-12"></i>
                    <p className="mb-0 font-12 ms-2">Staff Info</p>
                  </Link>
                </div>

                <div
                  className={
                    url == "/staffadd"
                      ? "py-2 px-3 mb-1 activenav"
                      : " py-2 px-3 mb-1 bactive"
                  }
                >
                  <Link
                    to={"/staffadd"}
                    className="linkdecoration navtext px-2 d-flex align-items-center"
                  >
                    <i className="fa-solid fa-angle-right font-12"></i>
                    <p className="mb-0 font-12 ms-2">Staff Add</p>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Bill Record  */}

          <div className="list-group panel sideitem rounded-0 ">
            <a
              href="#billrecord"
              className="list-group-item px-3"
              data-bs-toggle="collapse"
              data-bs-parent="#MainMenu"
            >
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <img src={budget} className="snavicon" />
                  <p className="mb-0 font-13 ms-2 fw-500">Bill Record</p>
                </div>
                <i className="fa-solid fa-chevron-down font-12"></i>
              </div>
            </a>
            <div className="collapse " id="billrecord"></div>
          </div>

          {/* Petty Cash */}

          <div className="list-group panel sideitem rounded-0 ">
            <a
              href="#accounts"
              className="list-group-item px-3"
              data-bs-toggle="collapse"
              data-bs-parent="#MainMenu"
            >
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <img src={budget} className="snavicon" />
                  <p className="mb-0 font-13 ms-2 fw-500">Accounts</p>
                </div>
                <i className="fa-solid fa-chevron-down font-12"></i>
              </div>
            </a>
            <div className="collapse " id="accounts">
              <div
                className={
                  url == "/pettycashassign"
                    ? "py-2 px-3 mb-1 activenav"
                    : " py-2 px-3 mb-1 bactive"
                }
              >
                <Link
                  to={"/pettycashassign"}
                  className="linkdecoration navtext px-2 d-flex align-items-center"
                >
                  <i className="fa-solid fa-angle-right font-12"></i>
                  <p className="mb-0 font-12 ms-2">Petty Cash Assign</p>
                </Link>
              </div>

              <div
                className={
                  url == "/pettycashsettlement"
                    ? "py-2 px-3 mb-1 activenav"
                    : " py-2 px-3 mb-1 bactive"
                }
              >
                <Link
                  to={"/pettycashsettlement"}
                  className="linkdecoration navtext px-2 d-flex align-items-center"
                >
                  <i className="fa-solid fa-angle-right font-12"></i>
                  <p className="mb-0 font-12 ms-2">Petty Cash Settlement</p>
                </Link>
              </div>
              <div
                className={
                  url == "/addbill"
                    ? "py-2 px-3 mb-1 activenav"
                    : " py-2 px-3 mb-1 bactive"
                }
              >
                <Link
                  to={"/addbill"}
                  className="linkdecoration navtext px-2 d-flex align-items-center"
                >
                  <i className="fa-solid fa-angle-right font-12"></i>
                  <p className="mb-0 font-12 ms-2">Add Bill</p>
                </Link>
              </div>

              <div
                className={
                  url == "/billlist"
                    ? "py-2 px-3 mb-1 activenav"
                    : " py-2 px-3 mb-1 bactive"
                }
              >
                <Link
                  to={"/billlist"}
                  className="linkdecoration navtext px-2 d-flex align-items-center"
                >
                  <i className="fa-solid fa-angle-right font-12"></i>
                  <p className="mb-0 font-12 ms-2">Bill List</p>
                </Link>
              </div>
            </div>
          </div>

          <div className="list-group panel sideitem rounded-0 ">
            <a
              href="#setting"
              className="list-group-item px-3"
              data-bs-toggle="collapse"
              data-bs-parent="#MainMenu"
            >
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <img src={budget} className="snavicon" />
                  <p className="mb-0 font-13 ms-2 fw-500">Settings</p>
                </div>
                <i className="fa-solid fa-chevron-down font-12"></i>
              </div>
            </a>
            <div className="collapse " id="setting">
              <div
                className={
                  url == "/userroleadd"
                    ? "py-2 px-3 mb-1 activenav"
                    : " py-2 px-3 mb-1 bactive"
                }
              >
                <Link
                  to={"/userroleadd"}
                  className="linkdecoration navtext px-2 d-flex align-items-center"
                >
                  <i className="fa-solid fa-angle-right font-12"></i>
                  <p className="mb-0 font-12 ms-2">Role</p>
                </Link>
              </div>

              <div
                className={
                  url == "/sessionsettings"
                    ? "py-2 px-3 mb-1 activenav"
                    : " py-2 px-3 mb-1 bactive"
                }
              >
                <Link
                  to={"/sessionsettings"}
                  className="linkdecoration navtext px-2 d-flex align-items-center"
                >
                  <i className="fa-solid fa-angle-right font-12"></i>
                  <p className="mb-0 font-12 ms-2">Session Settings</p>
                </Link>
              </div>

              <div
                className={
                  url == "/usersettings"
                    ? "py-2 px-3 mb-1 activenav"
                    : " py-2 px-3 mb-1 bactive"
                }
              >
                <Link
                  to={"/usersettings"}
                  className="linkdecoration navtext px-2 d-flex align-items-center"
                >
                  <i className="fa-solid fa-angle-right font-12"></i>
                  <p className="mb-0 font-12 ms-2">User Settings</p>
                </Link>
              </div>
            </div>
          </div>

          {/*  */}

          <div className="text-center my-3">
            <p className="font-10 text-muted">mPair SchoolSys V1.1</p>
            <p className="font-10 text-muted fst-italic">
              Powered by{" "}
              <span className="text-decoration-none">
                <a
                  href="https://mpairtec.com"
                  className="text-decoration-none"
                  target="_blank"
                >
                  mPair Technologies Ltd.
                </a>
              </span>
            </p>
          </div>
        </div>
        <div className="cover-bar"></div>
      </div>
    </>
  );
};
