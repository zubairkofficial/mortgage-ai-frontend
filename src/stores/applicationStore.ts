import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// Application interface
export interface Application {
  id: string;
  borrowerName: string;
  submissionDate: string;
  loanAmount: string;
  status: string;
  stage: string;
  lender: string | null;
  lastUpdated: string;
  missingDocuments: string[];
  loanType?: string;
  borrowerDetails?: {
    email: string;
    phone: string;
    address: string;
    creditScore: string;
    annualIncome: string;
    employmentStatus: string;
  };
  loanDetails?: {
    purpose: string;
    term: string;
    collateral: string;
  };
}

interface ApplicationState {
  applications: Application[]
  addApplication: (applicationData: any) => Application
  updateApplication: (id: string, updates: Partial<Application>) => void
  deleteApplication: (id: string) => void
  setApplications: (applications: Application[]) => void
}

// Create application store with persistence
export const useApplicationStore = create<ApplicationState>()(
  persist(
    (set, get) => ({
      applications: [
        {
          id: "APP001",
          borrowerName: "John Smith",
          submissionDate: "2023-05-10",
          loanAmount: "$350,000",
          status: "In Progress",
          stage: "Document Collection",
          lender: "FirstBank Lending",
          lastUpdated: "2023-05-15",
          missingDocuments: ["Bank Statements", "Employment Verification"]
        },
        {
          id: "APP002",
          borrowerName: "Sarah Johnson",
          submissionDate: "2023-05-05",
          loanAmount: "$420,000",
          status: "Under Review",
          stage: "Underwriting",
          lender: "HomeLoans Inc.",
          lastUpdated: "2023-05-14",
          missingDocuments: ["Property Appraisal"]
        },
        {
          id: "APP003",
          borrowerName: "Michael Davis",
          submissionDate: "2023-04-28",
          loanAmount: "$275,000",
          status: "Approved",
          stage: "Closing",
          lender: "FirstBank Lending",
          lastUpdated: "2023-05-12",
          missingDocuments: []
        },
        {
          id: "APP004",
          borrowerName: "Emma Wilson",
          submissionDate: "2023-05-01",
          loanAmount: "$380,000",
          status: "Rejected",
          stage: "N/A",
          lender: "Secure Mortgage Co.",
          lastUpdated: "2023-05-11",
          missingDocuments: []
        },
        {
          id: "APP005",
          borrowerName: "Robert Brown",
          submissionDate: "2023-05-12",
          loanAmount: "$550,000",
          status: "Draft",
          stage: "Pre-Qualification",
          lender: null,
          lastUpdated: "2023-05-12",
          missingDocuments: ["Income Verification", "Credit Report", "Property Details", "Down Payment Proof"]
        }
      ],

      addApplication: (applicationData) => {
        const { applications } = get()
        const newId = `APP${String(applications.length + 1).padStart(3, '0')}`
        const today = new Date().toISOString().split('T')[0]
        
        const newApplication: Application = {
          id: newId,
          borrowerName: applicationData.borrowerDetails.fullName,
          submissionDate: today,
          loanAmount: applicationData.loanDetails.amount.startsWith('$') 
            ? applicationData.loanDetails.amount 
            : `$${applicationData.loanDetails.amount}`,
          status: "Under Review",
          stage: "Initial Review",
          lender: null,
          lastUpdated: today,
          missingDocuments: [],
          loanType: applicationData.loanType,
          borrowerDetails: applicationData.borrowerDetails,
          loanDetails: applicationData.loanDetails
        }

        set(state => ({
          applications: [newApplication, ...state.applications]
        }))

        return newApplication
      },

      updateApplication: (id, updates) => {
        set(state => ({
          applications: state.applications.map(app => 
            app.id === id ? { ...app, ...updates } : app
          )
        }))
      },

      deleteApplication: (id) => {
        set(state => ({
          applications: state.applications.filter(app => app.id !== id)
        }))
      },

      setApplications: (applications) => {
        set({ applications })
      }
    }),
    {
      name: 'application-storage', // name of the item in storage
      storage: createJSONStorage(() => localStorage),
    }
  )
) 