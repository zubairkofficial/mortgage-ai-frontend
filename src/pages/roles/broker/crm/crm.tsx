import { FC, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowUpDown, RefreshCw, LinkIcon, Unlink, CheckCircle, AlertCircle, ExternalLink } from "lucide-react";

// Define the type for integration status
type IntegrationStatus = "connected" | "disconnected" | "pending";

// Define the type for sync log entries
type SyncLogEntry = {
  id: string;
  timestamp: Date;
  action: "push" | "pull";
  status: "success" | "failed";
  details: string;
};

// Mock integration data
const mockIntegrationStatus: IntegrationStatus = "disconnected";

// Mock sync log data
const mockSyncLogs: SyncLogEntry[] = [
  {
    id: "sync-001",
    timestamp: new Date(Date.now() - 3600000 * 2),
    action: "push",
    status: "success",
    details: "Successfully pushed 12 contacts to Go High Level"
  },
  {
    id: "sync-002",
    timestamp: new Date(Date.now() - 3600000 * 5),
    action: "pull",
    status: "success",
    details: "Successfully pulled 8 new contacts from Go High Level"
  },
  {
    id: "sync-003",
    timestamp: new Date(Date.now() - 3600000 * 24),
    action: "push",
    status: "failed",
    details: "Failed to push data: API rate limit exceeded"
  }
];

const BrokerCRM: FC = () => {
  const [integrationStatus, setIntegrationStatus] = useState<IntegrationStatus>(mockIntegrationStatus);
  const [syncLogs, setSyncLogs] = useState<SyncLogEntry[]>(mockSyncLogs);
  const [syncing, setSyncing] = useState<boolean>(false);
  
  // Mock functions for integration actions
  const handleConnectCRM = () => {
    // In a real application, this would open the OAuth flow or API key setup
    setSyncing(true);
    
    toast.info("Connecting to CRM", {
      description: "Establishing connection to Go High Level...",
    });
    
    setTimeout(() => {
      setIntegrationStatus("connected");
      setSyncing(false);
      
      toast.success("Successfully Connected", {
        description: "Your account is now linked to Go High Level CRM",
      });
      
      // Add successful connection to logs
      const newLogEntry: SyncLogEntry = {
        id: `sync-${Date.now()}`,
        timestamp: new Date(),
        action: "pull",
        status: "success",
        details: "Successfully connected to Go High Level CRM"
      };
      
      setSyncLogs([newLogEntry, ...syncLogs]);
    }, 2000);
  };
  
  const handleDisconnectCRM = () => {
    setSyncing(true);
    
    toast.info("Disconnecting from CRM", {
      description: "Removing connection to Go High Level...",
    });
    
    setTimeout(() => {
      setIntegrationStatus("disconnected");
      setSyncing(false);
      
      toast.success("Successfully Disconnected", {
        description: "Your account has been unlinked from Go High Level CRM",
      });
      
      // Add disconnect to logs
      const newLogEntry: SyncLogEntry = {
        id: `sync-${Date.now()}`,
        timestamp: new Date(),
        action: "push",
        status: "success",
        details: "Disconnected from Go High Level CRM"
      };
      
      setSyncLogs([newLogEntry, ...syncLogs]);
    }, 1000);
  };
  
  const handleSyncData = (direction: "push" | "pull") => {
    // Check if connected before proceeding
    if (integrationStatus !== "connected") {
      toast.error("Connection Required", {
        description: "You need to connect to Go High Level CRM to sync data",
      });
      return;
    }

    setSyncing(true);
    
    toast.info(`${direction === "push" ? "Pushing" : "Pulling"} Data`, {
      description: `${direction === "push" ? "Sending" : "Retrieving"} data ${direction === "push" ? "to" : "from"} Go High Level CRM...`,
    });
    
    // Simulate API call delay
    setTimeout(() => {
      setSyncing(false);
      
      // Create a new log entry
      const success = Math.random() > 0.2; // 80% chance of success for demo
      const newLogEntry: SyncLogEntry = {
        id: `sync-${Date.now()}`,
        timestamp: new Date(),
        action: direction,
        status: success ? "success" : "failed",
        details: success 
          ? `Successfully ${direction === "push" ? "pushed" : "pulled"} data ${direction === "push" ? "to" : "from"} Go High Level` 
          : `Failed to ${direction} data: ${direction === "push" ? "API error" : "Authentication expired"}`
      };
      
      // Show success or error toast
      if (success) {
        toast.success(`Data ${direction === "push" ? "Pushed" : "Pulled"} Successfully`, {
          description: `Successfully ${direction === "push" ? "sent" : "retrieved"} data ${direction === "push" ? "to" : "from"} Go High Level CRM`,
        });
      } else {
        toast.error(`Data ${direction === "push" ? "Push" : "Pull"} Failed`, {
          description: newLogEntry.details,
        });
      }
      
      setSyncLogs([newLogEntry, ...syncLogs]);
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* CRM Integration Header Card */}
      <Card className="card-gradient-primary">
        <CardHeader>
          <CardDescription className="text-base">Broker CRM Integration</CardDescription>
          <CardTitle className="text-2xl font-semibold">
            Go High Level Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm">
            <LinkIcon size={18} className="text-primary" />
            <span>Sync your borrower data with Go High Level CRM</span>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Automate customer relationship management tasks
          </div>
          <div className="text-muted-foreground">
            Synchronize contacts, pipelines, and communications between platforms
          </div>
        </CardFooter>
      </Card>

      {/* Integration Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Integration Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {integrationStatus === "connected" ? (
                <>
                  <CheckCircle className="text-[var(--brand-teal)]" size={24} />
                  <div>
                    <p className="font-medium">Connected</p>
                    <p className="text-sm text-muted-foreground">Your account is successfully linked to Go High Level</p>
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle className="text-muted-foreground" size={24} />
                  <div>
                    <p className="font-medium">Not Connected</p>
                    <p className="text-sm text-muted-foreground">Connect your Go High Level account to start syncing data</p>
                  </div>
                </>
              )}
            </div>
            <div>
              {integrationStatus === "connected" ? (
                <button 
                  className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors flex items-center gap-2"
                  onClick={handleDisconnectCRM}
                  disabled={syncing}
                >
                  {syncing ? <RefreshCw className="animate-spin h-4 w-4 mr-1" /> : <Unlink className="h-4 w-4 mr-1" />}
                  Disconnect
                </button>
              ) : (
                <button 
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
                  onClick={handleConnectCRM}
                  disabled={syncing}
                >
                  {syncing ? <RefreshCw className="animate-spin h-4 w-4 mr-1" /> : <LinkIcon className="h-4 w-4 mr-1" />}
                  Connect
                </button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sync Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Data Synchronization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <p className="text-sm">Push local data to Go High Level:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-2">
                  <li>Borrower contacts and profiles</li>
                  <li>Loan application statuses</li>
                  <li>Lead information and notes</li>
                </ul>
                <button 
                  className="mt-2 w-full py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                  onClick={() => handleSyncData("push")}
                  disabled={integrationStatus !== "connected" || syncing}
                >
                  {syncing ? <RefreshCw className="animate-spin h-4 w-4" /> : <ArrowUpDown className="h-4 w-4" />}
                  Push Data to CRM
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">CRM Data Import</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <p className="text-sm">Pull data from Go High Level:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-2">
                  <li>New leads and contacts</li>
                  <li>Campaign responses and interactions</li>
                  <li>Meeting schedules and follow-ups</li>
                </ul>
                <button 
                  className="mt-2 w-full py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                  onClick={() => handleSyncData("pull")}
                  disabled={integrationStatus !== "connected" || syncing}
                >
                  {syncing ? <RefreshCw className="animate-spin h-4 w-4" /> : <ArrowUpDown className="h-4 w-4" />}
                  Pull Data from CRM
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Integration Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Integration Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-medium">Auto-Sync</h3>
                <p className="text-sm text-muted-foreground">Automatically sync data every 24 hours</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-medium">Real-time Updates</h3>
                <p className="text-sm text-muted-foreground">Push critical updates immediately</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-medium">Notification Preferences</h3>
                <p className="text-sm text-muted-foreground">Receive alerts on sync failures</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>

        
          </div>
        </CardContent>
      </Card>

      {/* Sync Logs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Sync History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {syncLogs.length > 0 ? (
              syncLogs.map((log) => (
                <div key={log.id} className={`p-3 rounded-lg border ${
                  log.status === "success" 
                    ? "border-[var(--brand-teal)] bg-[color-mix(in_srgb,var(--brand-teal)_5%,transparent)]" 
                    : "border-destructive bg-[color-mix(in_srgb,var(--destructive)_5%,transparent)]"
                }`}>
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center">
                      {log.status === "success" ? (
                        <CheckCircle className="text-[var(--brand-teal)] h-4 w-4 mr-2" />
                      ) : (
                        <AlertCircle className="text-destructive h-4 w-4 mr-2" />
                      )}
                      <span className="font-medium">{log.action === "push" ? "Push to CRM" : "Pull from CRM"}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {log.timestamp.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm ml-6">{log.details}</p>
                </div>
              ))
            ) : (
              <div className="text-center p-6">
                <RefreshCw size={48} className="mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No sync history available</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="justify-between">
          <span className="text-sm text-muted-foreground">
            Showing recent {syncLogs.length} sync operations
          </span>
          {integrationStatus === "connected" && (
            <a 
              href="https://app.gohighlevel.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Go to CRM Dashboard
            </a>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default BrokerCRM;
