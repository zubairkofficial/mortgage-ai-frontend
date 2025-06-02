import { useState } from "react";
import { Role, Message } from "@/components/layout/chat/types";
import { ChatHeader } from "@/components/layout/chat/chat-header";
import { MessageList } from "@/components/layout/chat/message-list";
import { MessageInput } from "@/components/layout/chat/message-input";
import { Input } from "@/components/ui/input";
import {
  Search,
  PlusCircle,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/stores/userStore";
import { UserRole } from "@/lib/users";


// Mock data for roles
const mockRoles: Role[] = [
  {
    id: 1,
    name: "Underwriting Manager",
    avatar: null,
    initials: "UM",
    status: "online",
    unreadCount: 0,
    lastMessage: "Perfect! I'll start the conditional approval process right away.",
    isOnline: true,
    messages: [
      {
        id: 1,
        type: "text",
        content: {
          text: "Hi Loan Officer, I have a new loan application that needs your review.",
        },
        timestamp: "10:00 am",
        isRead: true,
        isSender: true,
      },
      {
        id: 2,
        type: "text",
        content: {
          text: "Sure, I'll take a look at it. Can you share the details?",
        },
        timestamp: "10:05 am",
        isRead: true,
        isSender: false,
      },
      {
        id: 3,
        type: "text",
        content: {
          text: "I've attached the application file. Please review the income verification documents.",
        },
        timestamp: "10:10 am",
        isRead: true,
        isSender: true,
      },
      {
        id: 4,
        type: "file",
        content: {
          fileName: "loan_application.pdf",
          fileSize: "2.4 MB",
          fileType: "application/pdf",
        },
        timestamp: "10:11 am",
        isRead: true,
        isSender: true,
      },
      {
        id: 5,
        type: "text",
        content: {
          text: "I'll review it and get back to you by end of day.",
        },
        timestamp: "10:15 am",
        isRead: true,
        isSender: false,
      },
      {
        id: 6,
        type: "text",
        content: {
          text: "I've completed the review. The borrower's DTI ratio is 28% and credit score is 750. Income documentation looks solid.",
        },
        timestamp: "3:30 pm",
        isRead: true,
        isSender: false,
      },
      {
        id: 7,
        type: "text",
        content: {
          text: "Excellent! What about the property appraisal?",
        },
        timestamp: "3:32 pm",
        isRead: true,
        isSender: true,
      },
      {
        id: 8,
        type: "text",
        content: {
          text: "Appraisal came in at $485,000, which is right on target with the purchase price. LTV is 80%.",
        },
        timestamp: "3:35 pm",
        isRead: true,
        isSender: false,
      },
      {
        id: 9,
        type: "text",
        content: {
          text: "Perfect! I'll start the conditional approval process right away.",
        },
        timestamp: "3:37 pm",
        isRead: true,
        isSender: true,
      },
    ],
  },
  {
    id: 2,
    name: "Loan Officer",
    avatar: null,
    initials: "LO",
    status: "online",
    unreadCount: 2,
    lastMessage: "I'll have the updated docs ready by tomorrow morning.",
    isOnline: true,
    messages: [
      {
        id: 1,
        type: "text",
        content: {
          text: "Hi Underwriting Manager, I've reviewed the loan application.",
        },
        timestamp: "2:00 pm",
        isRead: true,
        isSender: true,
      },
      {
        id: 2,
        type: "text",
        content: {
          text: "Great, what are your findings?",
        },
        timestamp: "2:05 pm",
        isRead: true,
        isSender: false,
      },
      {
        id: 3,
        type: "text",
        content: {
          text: "The income verification looks good, but we need additional documentation for the property appraisal.",
        },
        timestamp: "2:10 pm",
        isRead: true,
        isSender: true,
      },
      {
        id: 4,
        type: "text",
        content: {
          text: "I'll request that from the client right away.",
        },
        timestamp: "2:15 pm",
        isRead: true,
        isSender: false,
      },
      {
        id: 5,
        type: "text",
        content: {
          text: "Also, can you double-check the employment verification? The HR contact seems to be outdated.",
        },
        timestamp: "2:18 pm",
        isRead: true,
        isSender: false,
      },
      {
        id: 6,
        type: "text",
        content: {
          text: "Sure thing! I'll contact the borrower to get the updated HR information.",
        },
        timestamp: "2:20 pm",
        isRead: true,
        isSender: true,
      },
      {
        id: 7,
        type: "text",
        content: {
          text: "The client just sent over the updated employment verification. The new HR contact confirmed everything.",
        },
        timestamp: "4:45 pm",
        isRead: true,
        isSender: true,
      },
      {
        id: 8,
        type: "text",
        content: {
          text: "Excellent! Can you also get the final signed purchase agreement? I noticed the one we have is missing the addendum.",
        },
        timestamp: "4:47 pm",
        isRead: false,
        isSender: false,
      },
      {
        id: 9,
        type: "text",
        content: {
          text: "I'll have the updated docs ready by tomorrow morning.",
        },
        timestamp: "4:50 pm",
        isRead: false,
        isSender: true,
      },
    ],
  },
  {
    id: 3,
    name: "Processor",
    avatar: null,
    initials: "PR",
    status: "online",
    unreadCount: 1,
    lastMessage: "I'll start working on the conditions list right away.",
    isOnline: true,
    messages: [
      {
        id: 1,
        type: "text",
        content: {
          text: "Good morning! I'm starting the processing for the Johnson file. Any specific items I should prioritize?",
        },
        timestamp: "9:00 am",
        isRead: true,
        isSender: true,
      },
      {
        id: 2,
        type: "text",
        content: {
          text: "Morning! Yes, please focus on getting the title work ordered first. The closing is scheduled for next Friday.",
        },
        timestamp: "9:05 am",
        isRead: true,
        isSender: false,
      },
      {
        id: 3,
        type: "text",
        content: {
          text: "Perfect! I've already reached out to the title company. They should have the commitment ready by Wednesday.",
        },
        timestamp: "9:08 am",
        isRead: true,
        isSender: true,
      },
      {
        id: 4,
        type: "text",
        content: {
          text: "Great work! Also, can you verify the insurance information? The policy number seems incomplete.",
        },
        timestamp: "9:15 am",
        isRead: true,
        isSender: false,
      },
      {
        id: 5,
        type: "text",
        content: {
          text: "I'll call the insurance agent right now to get the complete policy details.",
        },
        timestamp: "9:17 am",
        isRead: true,
        isSender: true,
      },
      {
        id: 6,
        type: "text",
        content: {
          text: "Update: Insurance is all set! The agent emailed the full declaration page with correct policy number.",
        },
        timestamp: "11:30 am",
        isRead: true,
        isSender: true,
      },
      {
        id: 7,
        type: "text",
        content: {
          text: "Fantastic! The underwriter just sent over the initial approval with conditions. Can you start working on those?",
        },
        timestamp: "1:45 pm",
        isRead: true,
        isSender: false,
      },
      {
        id: 8,
        type: "file",
        content: {
          fileName: "conditions_list.pdf",
          fileSize: "1.2 MB",
          fileType: "application/pdf",
        },
        timestamp: "1:46 pm",
        isRead: true,
        isSender: false,
      },
      {
        id: 9,
        type: "text",
        content: {
          text: "I'll start working on the conditions list right away.",
        },
        timestamp: "1:48 pm",
        isRead: false,
        isSender: true,
      },
    ],
  },
  {
    id: 4,
    name: "Branch Manager",
    avatar: null,
    initials: "BM",
    status: "offline",
    unreadCount: 3,
    lastMessage: "Let's schedule a team meeting to discuss the new guidelines.",
    isOnline: false,
    messages: [
      {
        id: 1,
        type: "text",
        content: {
          text: "Team, I wanted to update everyone on the new lending guidelines that go into effect next month.",
        },
        timestamp: "8:00 am",
        isRead: true,
        isSender: true,
      },
      {
        id: 2,
        type: "text",
        content: {
          text: "Thanks for the heads up! Are there any major changes we should be aware of?",
        },
        timestamp: "8:05 am",
        isRead: true,
        isSender: false,
      },
      {
        id: 3,
        type: "text",
        content: {
          text: "Yes, the main changes are around debt-to-income ratios and the new verification requirements for self-employed borrowers.",
        },
        timestamp: "8:08 am",
        isRead: true,
        isSender: true,
      },
      {
        id: 4,
        type: "file",
        content: {
          fileName: "new_lending_guidelines_2024.pdf",
          fileSize: "3.1 MB",
          fileType: "application/pdf",
        },
        timestamp: "8:09 am",
        isRead: true,
        isSender: true,
      },
      {
        id: 5,
        type: "text",
        content: {
          text: "This is very comprehensive. Should we plan some training sessions for the team?",
        },
        timestamp: "10:30 am",
        isRead: true,
        isSender: false,
      },
      {
        id: 6,
        type: "text",
        content: {
          text: "Absolutely! I'm working with HR to schedule mandatory training for all loan officers.",
        },
        timestamp: "10:35 am",
        isRead: true,
        isSender: true,
      },
      {
        id: 7,
        type: "text",
        content: {
          text: "Also, I notice our loan volume is up 15% this quarter. Great work everyone!",
        },
        timestamp: "2:15 pm",
        isRead: false,
        isSender: true,
      },
      {
        id: 8,
        type: "text",
        content: {
          text: "That's excellent news! Any specific products driving the increase?",
        },
        timestamp: "2:18 pm",
        isRead: false,
        isSender: false,
      },
      {
        id: 9,
        type: "text",
        content: {
          text: "Let's schedule a team meeting to discuss the new guidelines.",
        },
        timestamp: "2:20 pm",
        isRead: false,
        isSender: true,
      },
    ],
  },
];

export default function ChatLayout() {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>(mockRoles[0]);
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [searchQuery, setSearchQuery] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const user = useUser((state) => state.user);

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setIsTyping(false);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        type: "text",
        content: {
          text: message,
        },
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isRead: true,
        isSender: true,
      };

      const updatedRoles = roles.map((role) => {
        if (role.id === selectedRole.id) {
          return {
            ...role,
            messages: [...role.messages, newMessage],
            lastMessage: message,
          };
        }
        return role;
      });

      setRoles(updatedRoles);
      setSelectedRole({
        ...selectedRole,
        messages: [...selectedRole.messages, newMessage],
      });

      setMessage("");
    }
  };

  const navigateToDashboard = () => {
    if (!user) return;

    switch (user.role) {
      case UserRole.BROKER:
        navigate("/broker/dashboard");
        break;
      case UserRole.ACCOUNT_EXECUTIVE:
        navigate("/account-executive/dashboard");
        break;
      case UserRole.UNDERWRITING_MANAGER:
        navigate("/underwriting-manager/dashboard");
        break;
      case UserRole.BRANCH_MANAGER:
        navigate("/branch-manager/dashboard");
        break;
      case UserRole.LENDER:
        navigate("/lender/dashboard");
        break;
      case UserRole.ADMIN:
        navigate("/admin/dashboard");
        break;
      default:
        navigate("/");
        break;
    }
  };

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <div className="flex flex-1 overflow-hidden">
        <div
          className={cn(
            "border-r border-border flex flex-col bg-background transition-all duration-300 ease-in-out relative",
            collapsed ? "w-12" : "w-80"
          )}
        >
          {/* Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-4 translate-x-1/2 z-10 h-8 w-8 rounded-full border bg-background"
            // onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>

          {!collapsed && (
            <>
              <div>
                {/* Back to Dashboard Button */}
                <Button
                  variant="ghost"
                  className="flex items-center w-full justify-start px-4 pt-8 pb-8 hover:bg-none"
                  onClick={navigateToDashboard}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  <span>Back to Dashboard</span>
                </Button>
                <Separator className="mb-2" />
              </div>

              {/* Sidebar Header */}
              <div className="p-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  Messages{" "}
                  <span className="text-sm text-muted-foreground">
                    ({roles.length})
                  </span>
                </h2>
              </div>

              {/* Search Bar */}
              <div className="px-4 pb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search here..."
                    className="min-w-full pl-10 pr-4 h-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Favorites Section */}
              <div className="px-4 pb-2">
                <h3 className="text-xs font-medium text-muted-foreground mb-2">
                  FAVOURITES
                </h3>
              </div>

              {/* Contact List */}
              <div className="flex-1 overflow-y-auto">
                {filteredRoles.map((role) => (
                  <div
                    key={role.id}
                    className={cn(
                      "px-4 py-3 flex items-center hover:bg-accent cursor-pointer",
                      selectedRole.id === role.id && "border-l-4 border-primary"
                    )}
                    onClick={() => handleRoleSelect(role)}
                  >
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      {role.initials}
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-foreground">
                          {role.name}
                        </h4>
                        {role.unreadCount && (
                          <span className="text-xs font-medium bg-destructive/10 text-destructive px-2 py-0.5 rounded-full">
                            {role.unreadCount}
                          </span>
                        )}
                      </div>
                      {role.lastMessage && (
                        <p className="text-sm text-muted-foreground truncate">
                          {role.lastMessage.slice(0, 30) + "..."}
                        </p>
                      )}
                    </div>
                  </div>
                ))}

                {/* Direct Messages Section */}
                <div className="px-4 py-3 flex justify-between items-center">
                  <h3 className="text-xs font-medium text-muted-foreground">
                    DIRECT MESSAGES
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 rounded-md"
                    aria-label="Add new message"
                  >
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Separator />

         
            </>
          )}
        </div>
        <div className="flex-1 flex flex-col overflow-hidden">
          <ChatHeader role={selectedRole} />
          <div className="@container/main relative flex flex-1 flex-col">
            <MessageList
              messages={selectedRole.messages}
              isTyping={isTyping}
              typingRole={selectedRole}
            />
            <MessageInput
              message={message}
              onMessageChange={setMessage}
              onSend={handleSendMessage}
              file={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
