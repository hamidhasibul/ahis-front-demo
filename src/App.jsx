import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import { Home } from "./screens/Home";
import { Dashboard } from "./screens/Dashboard/Dashboard";
import { AdmissionForm } from "./screens/Admission_Process/AdmissionForm";
import { AdmissionTest } from "./screens/Admission_Process/AdmissionTest/AdmissionTest";
import { ApplicantList } from "./screens/Admission_Process/ApplicantsList/ApplicantList";
import { StudentAdmission } from "./screens/StudentInformation/StudentAdmission";
import { Category } from "./screens/StudentInformation/Category";
import { House } from "./screens/StudentInformation/House";
import { ClassSection } from "./screens/Academic/ClassSection";
import { ApplicantListIndView } from "./screens/Admission_Process/ApplicantsList/ApplicantListIndView";
import { SessionContextProvider } from "./context/SessionContext";
import { AdmissionTestIndView } from "./screens/Admission_Process/AdmissionTest/AdmissionTestIndView";
import { ClassContextProvider } from "./context/ClassContext";
import { SectionContextProvider } from "./context/SectionContext";
import { CategoryContextProvider } from "./context/CategoryContext";
import { HouseContextProvider } from "./context/HouseContext";
import { StudentInfo } from "./screens/StudentInformation/StudentInfo/StudentInfo";
import { StudentInfoIndView } from "./screens/StudentInformation/StudentInfo/StudentInfoIndView";
import { EcaEnrollment } from "./screens/ECA/EcaEnrollment";
import { EcaMembers } from "./screens/ECA/EcaMembers";
import { HifzEnrollment } from "./screens/Hifz/HifzEnrollment";
import { HifzMembers } from "./screens/Hifz/HifzMembers";
import { FeesType } from "./screens/FeesCollection/FeesType";
import { FeesInfo } from "./screens/FeesCollection/FeesInfo";
import { EnrollmentFees } from "./screens/FeesCollection/EnrollmentFees/EnrollmentFees";
import { EnrollmentFeesIndView } from "./screens/FeesCollection/EnrollmentFees/EnrollmentFeesIndView";

import { CollectFees } from "./screens/FeesCollection/CollectFees/CollectFees";
import { StudentFees } from "./screens/FeesCollection/CollectFees/StudentFees";
import { ExpenseHead } from "./screens/Expense/ExpenseHead";
import { AddExpense } from "./screens/Expense/AddExpense";
import { StudentIncome } from "./screens/Income/StudentIncome";
import { GeneralIncome } from "./screens/Income/GeneralIncome";
import { IncomeHead } from "./screens/Income/IncomeHead";
import { LibrarySell } from "./screens/Library/LibrarySell";
import { MakeRequisition } from "./screens/Procurement/MakeRequisition";
import { RequisitionList } from "./screens/Procurement/RequisitionList";
import { CsGeneration } from "./screens/Procurement/CsGeneration";
import { CsList } from "./screens/Procurement/CsList";
import { GenerateOrder } from "./screens/Procurement/GenerateOrder";
import { OrderList } from "./screens/Procurement/OrderList";
import { MakeFR } from "./screens/Procurement/MakeFR";
import { MakeSP } from "./screens/Procurement/MakeSP";
import { AuditTrial } from "./screens/Procurement/AuditTrial";
import { FeesApproval } from "./screens/FeesCollection/FeesApproval";
import { RequisitionView } from "./screens/Procurement/RequisitionView";
import { UserRoleContextProvider } from "./context/UserRoleContext";
import { BulkIdCard } from "./screens/Certificate/BulkIdCard";
import { ProgramCertificate } from "./screens/Certificate/ProgramCertificate";
import { CertificateCustomize } from "./screens/Certificate/CertificateCustomize";
import { IDCard } from "./screens/Certificate/IDCard";
import { AdmissionRequirements } from "./screens/FrontOffice/AdmissionRequirements";
import { ComplainBox } from "./screens/FrontOffice/ComplainBox";
import { ContactOfAllEmployees } from "./screens/FrontOffice/ContactOfAllEmployees";
import { PostalDispatch } from "./screens/FrontOffice/PostalDispatch";
import { PostalReceive } from "./screens/FrontOffice/PostalReceive";
import { VisitorBook } from "./screens/FrontOffice/VisitorBook";
import { CsView } from "./screens/Procurement/CsView";
import { ProductCategory } from "./screens/StoreInventory/ProductCategory";
import { ProductAdd } from "./screens/StoreInventory/ProductAdd";
import { OrderView } from "./screens/Procurement/OrderView";
import { Suppliers } from "./screens/Procurement/Suppliers";
import { EligibleStudentView } from "./screens/Admission_Process/EligibleStudent/EligibleStudentView";
import { FeesForward } from "./screens/FeesCollection/FeesForward";
import { Error } from "./screens/Error/Error";
import { ApproveExpense } from "./screens/Expense/ApproveExpense";
import { ApproveIncome } from "./screens/Income/ApproveIncome";
import { DiscountType } from "./screens/FeesDiscount/DiscountType";
import { DiscountAssign } from "./screens/FeesDiscount/DiscountAssign";
import { FinancialAid } from "./screens/FeesDiscount/FinancialAid";
import { ProductStduent } from "./screens/StoreInventory/ProductStudent";
import { MakeBudget } from "./screens/Budget/MakeBudget";
import { BudgetList } from "./screens/Budget/BudgetList";
import { GRN } from "./screens/StoreInventory/GRN";
import { MDR } from "./screens/StoreInventory/MDR";
import { GRNList } from "./screens/StoreInventory/GRNList";
import { MDRList } from "./screens/StoreInventory/MDRList";
import { SPView } from "./screens/Procurement/SPView";
import { FRlist } from "./screens/Procurement/FRlist";
import { SPlist } from "./screens/Procurement/SPlist";
import { FRView } from "./screens/Procurement/FRView";
import { BudgetView } from "./screens/Budget/BudgetView";
import { AdmitCardGenerate } from "./screens/Examination/admitcardgenerate";
import { ExamEligibility } from "./screens/Examination/ExamEligibility";
import { TempPass } from "./screens/Examination/TempPass";
import { TempPassDownload } from "./screens/Examination/TempPassDownload";
import { Department } from "./screens/HR/Department";
import { Designation } from "./screens/HR/Designation";
import { UserRoleAdd } from "./screens/UserRole/userRoleAdd";
import { UserPrevilege } from "./screens/UserRole/UserPrevilege";
import {
  UserPrevilegeContext,
  UserPrevilegeContextProvider,
} from "./context/UserPrevilegeContext";
import { StaffInfo } from "./screens/HR/StaffInfo";
import { StaffAdd } from "./screens/HR/StaffAdd";
import { StaffinfoIndu } from "./screens/HR/StaffinfoIndu";
import { StudentPromotion } from "./screens/Promotion/StudentPromotion";
import { SessionSettings } from "./screens/Settings/SessionSettings";
import { UserSettings } from "./screens/Settings/UserSettings";
import { ApprovelView } from "./screens/Approvel/ApprovelView";
import { AddBill } from "./screens/BillRecord/AddBill";
import { BillList } from "./screens/BillRecord/BillList";
import { PettyCashAssign } from "./screens/Accounts/PettyCashAssign";
import { PettyCashSettlement } from "./screens/Accounts/PettyCashSettlement";
import { TrasferCertificateApplication } from "./screens/Certificate/TrasferCertificateApplication";
import { StudentAidEdit } from "./screens/Approvel/StudentAidEdit";
import { PattyCash } from "./screens/Expense/PattyCash";
import { SiblingInfoList } from "./screens/StudentInformation/SiblingInfo/SiblingInfoList";
import { SiblingInfoView } from "./screens/StudentInformation/SiblingInfo/SiblingInfoView";
import { DoTask } from "./screens/Calender/DoTask";
function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <UserPrevilegeContextProvider>
                  <SessionContextProvider>
                    <UserRoleContextProvider>
                      <Home />
                    </UserRoleContextProvider>
                  </SessionContextProvider>
                </UserPrevilegeContextProvider>
              }
            />
            <Route
              path="/dashboard"
              element={
                <UserPrevilegeContextProvider>
                  <SessionContextProvider>
                    <UserRoleContextProvider>
                      <Dashboard />
                    </UserRoleContextProvider>
                  </SessionContextProvider>
                </UserPrevilegeContextProvider>
              }
            />
            {/* Font Office */}
            <Route
              path="/admissionrequirements"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <AdmissionRequirements />
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/complainbox"
              element={
                <UserPrevilegeContextProvider>
                  <UserRoleContextProvider>
                    <SessionContextProvider>
                      <ComplainBox />
                    </SessionContextProvider>
                  </UserRoleContextProvider>
                </UserPrevilegeContextProvider>
              }
            />
            <Route
              path="/contactofemployees"
              element={
                <UserPrevilegeContextProvider>
                  <UserRoleContextProvider>
                    <SessionContextProvider>
                      <ContactOfAllEmployees />
                    </SessionContextProvider>
                  </UserRoleContextProvider>
                </UserPrevilegeContextProvider>
              }
            />
            <Route
              path="/postaldispatch"
              element={
                <UserPrevilegeContextProvider>
                  <UserRoleContextProvider>
                    <SessionContextProvider>
                      <PostalDispatch />
                    </SessionContextProvider>
                  </UserRoleContextProvider>
                </UserPrevilegeContextProvider>
              }
            />
            <Route
              path="/postalreceive"
              element={
                <UserPrevilegeContextProvider>
                  <UserRoleContextProvider>
                    <SessionContextProvider>
                      <PostalReceive />
                    </SessionContextProvider>
                  </UserRoleContextProvider>
                </UserPrevilegeContextProvider>
              }
            />
            <Route
              path="/visitorsbook"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <VisitorBook />
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />

            {/* Admission Form Route */}
            <Route
              path="/admissionform"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <ClassContextProvider>
                        <AdmissionForm />
                      </ClassContextProvider>
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            {/* Admission Test Routes */}
            <Route
              path="/admissiontest"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <AdmissionTest />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/admissiontest/view/:id"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <AdmissionTestIndView />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            {/* Applicants Routes */}
            <Route
              path="/applicantlist"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <ApplicantList />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/applicantlist/view/:id"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <ApplicantListIndView />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            {/* Students Information Routes */}
            <Route
              path="/studentinfo"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <ClassContextProvider>
                        <SectionContextProvider>
                          <StudentInfo />
                        </SectionContextProvider>
                      </ClassContextProvider>
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/studentinfo/view/:id"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <StudentInfoIndView />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            {/* Student Admission Route */}
            <Route
              path="/studentadmission"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <ClassContextProvider>
                        <SectionContextProvider>
                          <CategoryContextProvider>
                            <HouseContextProvider>
                              <StudentAdmission />
                            </HouseContextProvider>
                          </CategoryContextProvider>
                        </SectionContextProvider>
                      </ClassContextProvider>
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            {/* Student Category Route */}
            <Route
              path="/category"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <CategoryContextProvider>
                        <Category />
                      </CategoryContextProvider>
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            {/* Student House Route */}
            <Route
              path="/house"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <HouseContextProvider>
                        <House />
                      </HouseContextProvider>
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />

            {/* Sibling Info Route */}

            <Route
              path="/siblinginfo"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <HouseContextProvider>
                        <ClassContextProvider>
                          <SectionContextProvider>
                            <SiblingInfoList />
                          </SectionContextProvider>
                        </ClassContextProvider>
                      </HouseContextProvider>
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />

            <Route
              path="/siblinginfoview/:id"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <HouseContextProvider>
                        <SiblingInfoView />
                      </HouseContextProvider>
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />

            {/* Academic Routes */}
            {/* Class Section Route */}
            <Route
              path="/classsection"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <ClassContextProvider>
                        <SectionContextProvider>
                          <ClassSection />
                        </SectionContextProvider>
                      </ClassContextProvider>
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />

            {/* Examination */}

            <Route
              path="/admitcardgenerate"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <ClassContextProvider>
                        <SectionContextProvider>
                          <AdmitCardGenerate />
                        </SectionContextProvider>
                      </ClassContextProvider>
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />

            <Route
              path="/exameligibility"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <ClassContextProvider>
                        <SectionContextProvider>
                          <ExamEligibility />
                        </SectionContextProvider>
                      </ClassContextProvider>
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />

            <Route
              path="/temppass"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <ClassContextProvider>
                        <SectionContextProvider>
                          <TempPass />
                        </SectionContextProvider>
                      </ClassContextProvider>
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />

            <Route
              path="/temppassdownload"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <ClassContextProvider>
                        <SectionContextProvider>
                          <TempPassDownload />
                        </SectionContextProvider>
                      </ClassContextProvider>
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />

            {/* ECA & Hifz */}
            {/* ECA Routes */}
            <Route
              path="/ecaenrollment"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <ClassContextProvider>
                        <SectionContextProvider>
                          <EcaEnrollment />
                        </SectionContextProvider>
                      </ClassContextProvider>
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/ecamembers"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <EcaMembers />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            {/* Hifz Routes */}
            <Route
              path="/hifzenrollment"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <ClassContextProvider>
                        <SectionContextProvider>
                          <HifzEnrollment />
                        </SectionContextProvider>
                      </ClassContextProvider>
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/hifzmembers"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <HifzMembers />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            {/* Fees Collection */}
            <Route
              path="/feestype"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <FeesType />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/feesinfo"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <ClassContextProvider>
                        <FeesInfo />
                      </ClassContextProvider>
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/enrollmentfees"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <ClassContextProvider>
                        <SectionContextProvider>
                          <EnrollmentFees />
                        </SectionContextProvider>
                      </ClassContextProvider>
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/enrollmentfees/view/:id"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <ClassContextProvider>
                        <EnrollmentFeesIndView />
                      </ClassContextProvider>
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            {/* Collect Fees */}
            <Route
              path="/collectfees"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <ClassContextProvider>
                        <SectionContextProvider>
                          <CollectFees />
                        </SectionContextProvider>
                      </ClassContextProvider>
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/collectfees/view/:id"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <StudentFees />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/feesapproval"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <FeesApproval />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />

            {/* ANCHOR Fees Discount Routes */}

            <Route
              path="/discounttype"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <DiscountType />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/discountassign"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <ClassContextProvider>
                        <SectionContextProvider>
                          <DiscountAssign />
                        </SectionContextProvider>
                      </ClassContextProvider>
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/financialaid"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <FinancialAid />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />

            {/* ANCHOR Expense Routes */}

            <Route
              path="/expensehead"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <ExpenseHead />
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/addexpense"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <AddExpense />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/approveexpense"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <ApproveExpense />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/studentincome"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <SectionContextProvider>
                        <StudentIncome />
                      </SectionContextProvider>
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/generalincome"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <SectionContextProvider>
                        <GeneralIncome />
                      </SectionContextProvider>
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/incomehead"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <SectionContextProvider>
                        <IncomeHead />
                      </SectionContextProvider>
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />

            <Route
              path="/approveincome"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <ApproveIncome />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/librarysell"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <SectionContextProvider>
                        <LibrarySell />
                      </SectionContextProvider>
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            ></Route>
            {/* Procurement Routes */}
            <Route
              path="/makerequisition"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <MakeRequisition />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/requisitionlist"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <RequisitionList />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/requisition/view/:id"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <RequisitionView />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />

            {/* HR Dept */}
            <Route
              path="/department"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <Department />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/designation"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <Designation />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />

            <Route
              path="/staffinfo"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <StaffInfo />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />

            <Route
              path="/staffadd"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <StaffAdd />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/staff/view/:id"
              element={
                <UserRoleContextProvider>
                  <SessionContextProvider>
                    <StaffinfoIndu />
                  </SessionContextProvider>
                </UserRoleContextProvider>
              }
            />

            <Route
              path="/suppliers"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <Suppliers />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/cs/view/:id"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <CsView />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/csgenerate"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <CsGeneration />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/cslist"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <CsList />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/generateorder"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <GenerateOrder />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/orderlist"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <OrderList />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/po/view/:id"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <OrderView />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/makefr"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <MakeFR />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/makesp"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <MakeSP />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/audittrial"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <AuditTrial />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />

            <Route
              path="/student-card-generate"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <ClassContextProvider>
                        <SectionContextProvider>
                          <IDCard />
                        </SectionContextProvider>
                      </ClassContextProvider>
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/bulk-student-card-generator"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <BulkIdCard />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/program-certificate"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <ProgramCertificate />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/certificate-customize"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <CertificateCustomize />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />

            {/* Store & Inventory */}

            <Route
              path="/productcategory"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <ProductCategory />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />

            <Route
              path="/product-student"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <ProductStduent />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />

            <Route
              path="/productadd"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <ProductAdd />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />

            <Route
              path="/GRN"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <GRN />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/MDR"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <MDR />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />

            <Route
              path="/GRNList"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <GRNList />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />

            <Route
              path="/MDRList"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <MDRList />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />

            <Route
              path="/sp-list"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <SPlist />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/fr-list"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <FRlist />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/sp-view/:id"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <SPView />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/budget/view/:id"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <BudgetView />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/fr-view/:id"
              element={
                <UserRoleContextProvider>
                  <SessionContextProvider>
                    <FRView />
                  </SessionContextProvider>
                </UserRoleContextProvider>
              }
            />

            <Route
              path="/eligible-student"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <EligibleStudentView />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/fees-forward"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SectionContextProvider>
                      <ClassContextProvider>
                        <SessionContextProvider>
                          <FeesForward />
                        </SessionContextProvider>
                      </ClassContextProvider>
                    </SectionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />

            <Route
              path="/makebudget"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <MakeBudget />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/budgetlist"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <BudgetList />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />

            {/* ANCHOR User Role */}

            <Route
              path="/userroleadd"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <UserRoleAdd />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/student-promotion"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <ClassContextProvider>
                        <SectionContextProvider>
                          <StudentPromotion />
                        </SectionContextProvider>
                      </ClassContextProvider>
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />

            <Route
              path="/userprevilege/:id"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <UserPrevilege />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />

            {/* Settings Routes */}

            <Route
              path="/sessionsettings"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <SessionSettings />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />

            <Route
              path="/usersettings"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <UserSettings />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/approve"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <ApprovelView />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />

            {/* Accounts Routes */}

            <Route
              path="/addbill"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <AddBill />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />

            <Route
              path="/billlist"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <BillList />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />

            <Route
              path="/pettycashassign"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <PettyCashAssign />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />

            <Route
              path="/pettycashsettlement"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <PettyCashSettlement />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/tc-certificate-application"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <ClassContextProvider>
                        <SectionContextProvider>
                          <TrasferCertificateApplication />
                        </SectionContextProvider>
                      </ClassContextProvider>
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />

            <Route
              path="/studentaidedit/:id"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <StudentAidEdit />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
            <Route
              path="/dotask"
              element={
                <UserRoleContextProvider>
                  <UserPrevilegeContextProvider>
                    <SessionContextProvider>
                      <DoTask />
                    </SessionContextProvider>
                  </UserPrevilegeContextProvider>
                </UserRoleContextProvider>
              }
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
