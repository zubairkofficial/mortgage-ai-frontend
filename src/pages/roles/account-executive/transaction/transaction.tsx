import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataTable, createSortableColumn } from "@/components/common/table"
import { Check, CreditCard, Plus } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

// Account type for default accounts
interface DefaultAccount {
  id: string
  accountNo: string
  accountTitle: string
  bankName: string
}

// Online Transaction type
interface OnlineTransaction {
  selectedAccount: DefaultAccount
  receiverAccountNo: string
  timestamp: string
}

// Manual Transaction type
interface ManualTransaction {
  senderNo: string
  accountTitle: string
  receiverAccountNo: string
  title: string
  transactionImage: string
}

// Default accounts data
const defaultAccounts: DefaultAccount[] = [
  {
    id: "1",
    accountNo: "1234567890",
    accountTitle: "Business Account - ABC Corp",
    bankName: "Bank of America"
  },
  {
    id: "2", 
    accountNo: "9876543210",
    accountTitle: "Personal Account - John Doe",
    bankName: "Chase Bank"
  },
  {
    id: "3",
    accountNo: "5555666677",
    accountTitle: "Savings Account - Investment Fund",
    bankName: "Wells Fargo"
  }
]

// Columns definition for online transactions
const onlineColumns: ColumnDef<OnlineTransaction, any>[] = [
  {
    accessorKey: "selectedAccount",
    header: "Account No",
    cell: ({ row }) => row.original.selectedAccount.accountNo,
  },
  {
    accessorKey: "selectedAccount",
    header: "Account Title", 
    cell: ({ row }) => row.original.selectedAccount.accountTitle,
  },
  {
    accessorKey: "selectedAccount",
    header: "Bank Name",
    cell: ({ row }) => row.original.selectedAccount.bankName,
  },
  createSortableColumn("receiverAccountNo", "Receiver Account No"),
  createSortableColumn("timestamp", "Timestamp"),
]

// Columns definition for manual transactions
const manualColumns: ColumnDef<ManualTransaction, any>[] = [
  createSortableColumn("senderNo", "Sender No"),
  createSortableColumn("accountTitle", "Account Title"),
  createSortableColumn("receiverAccountNo", "Receiver Account No"),
  createSortableColumn("title", "Title"),
  {
    accessorKey: "transactionImage",
    header: "Transaction Image",
    cell: ({ row }) => (
      <img
        src={row.original.transactionImage}
        alt="Transaction"
        className="h-10 w-10 object-cover rounded"
      />
    ),
  },
]

function Transaction() {
  const [tab, setTab] = useState("online")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedForm, setSelectedForm] = useState<null | "online" | "manual">(null)

  // State for transaction arrays
  const [onlineTransactions, setOnlineTransactions] = useState<OnlineTransaction[]>([
    {
      selectedAccount: defaultAccounts[0],
      receiverAccountNo: "0987654321",
      timestamp: "2024-04-01 10:00 AM"
    },
    {
      selectedAccount: defaultAccounts[1],
      receiverAccountNo: "1111222233",
      timestamp: "2024-04-02 11:00 AM"
    },
  ])

  const [manualTransactions, setManualTransactions] = useState<ManualTransaction[]>([
    {
      senderNo: "2222333344",
      accountTitle: "Alice Brown",
      receiverAccountNo: "3333444455",
      title: "Salary Payment",
      transactionImage: "https://via.placeholder.com/40",
    },
    {
      senderNo: "6666777788",
      accountTitle: "Bob White",
      receiverAccountNo: "7777888899",
      title: "Loan Disbursement",
      transactionImage: "https://via.placeholder.com/40",
    },
  ])

  // Separate form states for online and manual
  const [onlineFormData, setOnlineFormData] = useState({
    selectedAccountId: defaultAccounts[0].id,
    receiverAccountNo: "",
  })
  const [manualFormData, setManualFormData] = useState({
    senderNo: "",
    accountTitle: "",
    receiverAccountNo: "",
    title: "",
    transactionImage: "",
    deliveryMethod: "by hand",
    trackingId: "",
    receiptImage: "",
  })

  // Reset form selection when dialog closes
  useEffect(() => {
    if (!dialogOpen) setSelectedForm(null)
  }, [dialogOpen])

  // Online form input handler
  const handleOnlineInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setOnlineFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Manual form input handler
  const handleManualInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, files } = e.target as HTMLInputElement
    if (type === "file") {
      setManualFormData((prev) => ({ ...prev, [name]: files && files[0] ? files[0] : "" }))
    } else {
      setManualFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  // Online form submit
  const handleOnlineSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Find selected account
    const selectedAccount = defaultAccounts.find(account => account.id === onlineFormData.selectedAccountId)
    if (!selectedAccount) return
    
    // Create new transaction from form data
    const newTransaction: OnlineTransaction = {
      selectedAccount: selectedAccount,
      receiverAccountNo: onlineFormData.receiverAccountNo,
      timestamp: new Date().toLocaleString(),
    }
    
    // Add to online transactions
    setOnlineTransactions(prev => [...prev, newTransaction])
    
    setDialogOpen(false)
    setOnlineFormData({ selectedAccountId: defaultAccounts[0].id, receiverAccountNo: "" })
  }

  // Manual form submit
  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Create new transaction from form data
    const newTransaction: ManualTransaction = {
      senderNo: manualFormData.senderNo,
      accountTitle: manualFormData.accountTitle,
      receiverAccountNo: manualFormData.receiverAccountNo,
      title: manualFormData.title,
      transactionImage: manualFormData.transactionImage || "https://via.placeholder.com/40",
    }
    
    // Add to manual transactions
    setManualTransactions(prev => [...prev, newTransaction])
    
    setDialogOpen(false)
    setManualFormData({ senderNo: "", accountTitle: "", receiverAccountNo: "", title: "", transactionImage: "", deliveryMethod: "by hand", trackingId: "", receiptImage: "" })
  }

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <Tabs defaultValue="online" value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="online">Online Transactions</TabsTrigger>
            <TabsTrigger value="manual">Manual Transactions</TabsTrigger>
          </TabsList>
          <TabsContent value="online">
                <DataTable
                  columns={onlineColumns}
                  data={onlineTransactions}
                  title="Online Transactions"
                  description="List of online transactions"
                  searchKey="receiverAccountNo"
                  actionButtonText="Add New Transaction"
                  actionButtonIcon={<Plus className="h-4 w-4" />}
                  onActionButtonClick={() => setDialogOpen(true)}
                />
          </TabsContent>
          <TabsContent value="manual">
                <DataTable
                  columns={manualColumns}
                  data={manualTransactions}
                  title="Manual Transactions"
                  description="List of manual transactions"
                  searchKey="accountTitle"
                  actionButtonText="Add Manual Transaction"
                  actionButtonIcon={<Plus className="h-4 w-4" />}
                  onActionButtonClick={() => setDialogOpen(true)}
                />
          </TabsContent>
        </Tabs>
        <DialogContent className="lg:min-w-3xl lg:min-h-2xl">
          {!selectedForm && (
            <div className="flex flex-col lg:flex-row gap-4 justify-center items-center">
              <div
                className={`relative w-80 h-48 rounded-xl border cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  selectedForm === "online"
                    ? "bg-gradient-to-br from-primary via-purple-600 to-primary/75 border-primary/25 shadow-2xl"
                    : "bg-gradient-to-br from-primary via-purple-500 to-primary/75 border-primary/25 shadow-lg hover:shadow-xl"
                }`}
                onClick={() => setSelectedForm("online")}
              >
                {/* Selection Radio Button */}
                <div className="absolute top-4 right-4">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedForm === "online"
                        ? "bg-white border-white"
                        : "border-white/60"
                    }`}
                  >
                    {selectedForm === "online" && (
                      <Check size={12} className="text-blue-600" />
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 h-full flex flex-col justify-between">
                  <div className="text-white/90">
                    <CreditCard size={28} strokeWidth={1.5} />
                  </div>

                  <div>
                    <h3 className="text-white text-xl font-semibold leading-tight">
                      Online Payment
                      <br />
                      Form
                    </h3>
                    <p className="text-white/80 text-sm mt-2">
                      Accept payments online with cards
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={`relative w-80 h-48 rounded-xl border cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  selectedForm === "manual"
                    ? "bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 border-blue-300 shadow-2xl"
                    : "bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 border-blue-200 shadow-lg hover:shadow-xl"
                }`}
                onClick={() => setSelectedForm("manual")}
              >
                {/* Selection Radio Button */}
                <div className="absolute top-4 right-4">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedForm === "manual"
                        ? "bg-white border-white"
                        : "border-white/60"
                    }`}
                  >
                    {selectedForm === "manual" && (
                      <Check size={12} className="text-blue-600" />
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 h-full flex flex-col justify-between">
                  <div className="text-white/90">
                    <CreditCard size={28} strokeWidth={1.5} />
                  </div>

                  <div>
                    <h3 className="text-white text-xl font-semibold leading-tight">
                      Manual Payment
                      <br />
                      Form
                    </h3>
                    <p className="text-white/80 text-sm mt-2">
                      Accept payments manual with cards
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {selectedForm === "online" && (
            <form className="space-y-4" onSubmit={handleOnlineSubmit}>
              <CardTitle className="mb-2">Online Payment Form</CardTitle>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="lg:col-span-2">
                  <Label className="py-2">Select Account</Label>
                  <select
                    name="selectedAccountId"
                    value={onlineFormData.selectedAccountId}
                    onChange={handleOnlineInputChange}
                    className="w-full border rounded-md px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    {defaultAccounts.map((account) => (
                      <option key={account.id} value={account.id}>
                        {account.accountTitle} - {account.accountNo} ({account.bankName})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="lg:col-span-2">
                  <Label className="py-2">Receiver Account No</Label>
                  <Input name="receiverAccountNo" value={onlineFormData.receiverAccountNo} onChange={handleOnlineInputChange} required />
                </div>
              </div>
              <Button type="submit" className="w-full mt-2">Submit</Button>
            </form>
          )}
          {selectedForm === "manual" && (
            <form className="space-y-4 max-h-[70vh] w-[98%] px-2 overflow-y-auto" onSubmit={handleManualSubmit}>
              <CardTitle className="mb-2">Manual Payment Form</CardTitle>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <Label className="py-2">Sender No</Label>
                  <Input name="senderNo" value={manualFormData.senderNo} onChange={handleManualInputChange} required />
                </div>
                <div>
                  <Label className="py-2">Account Title</Label>
                  <Input name="accountTitle" value={manualFormData.accountTitle} onChange={handleManualInputChange} required />
                </div>
                <div>
                  <Label className="py-2">Receiver Account No</Label>
                  <Input name="receiverAccountNo" value={manualFormData.receiverAccountNo} onChange={handleManualInputChange} required />
                </div>
                <div>
                  <Label className="py-2">Title</Label>
                  <Input name="title" value={manualFormData.title} onChange={handleManualInputChange} required />
                </div>
                <div className="lg:col-span-2">
                  <Label className="py-2">Transaction Image</Label>
                  <Input name="transactionImage" type="file" onChange={handleManualInputChange} required />
                </div>
                <div className="lg:col-span-2">
                  <Label className="py-2">Delivery Method</Label>
                  <select
                    name="deliveryMethod"
                    value={manualFormData.deliveryMethod}
                    onChange={handleManualInputChange}
                    className="w-full border rounded-md px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option className="bg-primary" value="by hand">By hand</option>
                    <option className="bg-primary" value="by courier">By courier</option>
                  </select>
                </div>
                {manualFormData.deliveryMethod === "by courier" && (
                  <>
                    <div className="lg:col-span-2">
                      <Label className="py-2">Tracking ID</Label>
                      <Input name="trackingId" value={manualFormData.trackingId} onChange={handleManualInputChange} required />
                    </div>
                    <div className="lg:col-span-2">
                      <Label className="py-2">Receipt Image</Label>
                      <Input name="receiptImage" type="file" onChange={handleManualInputChange} required />
                    </div>
                  </>
                )}
              </div>
              <Button type="submit" className="w-full mt-2 ">Submit</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Transaction