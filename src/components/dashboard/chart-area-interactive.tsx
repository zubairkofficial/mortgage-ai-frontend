import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export const description = "An interactive area chart"

const chartData = [
  { date: "2024-04-01", applications: 22, approvals: 15 },
  { date: "2024-04-02", applications: 27, approvals: 18 },
  { date: "2024-04-03", applications: 31, approvals: 22 },
  { date: "2024-04-04", applications: 24, approvals: 20 },
  { date: "2024-04-05", applications: 37, approvals: 29 },
  { date: "2024-04-06", applications: 30, approvals: 24 },
  { date: "2024-04-07", applications: 25, approvals: 18 },
  { date: "2024-04-08", applications: 41, approvals: 32 },
  { date: "2024-04-09", applications: 29, approvals: 21 },
  { date: "2024-04-10", applications: 26, approvals: 19 },
  { date: "2024-04-11", applications: 33, approvals: 25 },
  { date: "2024-04-12", applications: 29, approvals: 21 },
  { date: "2024-04-13", applications: 34, approvals: 28 },
  { date: "2024-04-14", applications: 27, approvals: 22 },
  { date: "2024-04-15", applications: 22, approvals: 17 },
  { date: "2024-04-16", applications: 23, approvals: 19 },
  { date: "2024-04-17", applications: 45, approvals: 36 },
  { date: "2024-04-18", applications: 36, approvals: 31 },
  { date: "2024-04-19", applications: 24, approvals: 18 },
  { date: "2024-04-20", applications: 19, approvals: 15 },
  { date: "2024-04-21", applications: 23, approvals: 20 },
  { date: "2024-04-22", applications: 22, approvals: 17 },
  { date: "2024-04-23", applications: 28, approvals: 23 },
  { date: "2024-04-24", applications: 39, approvals: 29 },
  { date: "2024-04-25", applications: 32, approvals: 25 },
  { date: "2024-04-26", applications: 25, approvals: 13 },
  { date: "2024-04-27", applications: 38, approvals: 32 },
  { date: "2024-04-28", applications: 22, approvals: 18 },
  { date: "2024-04-29", applications: 31, approvals: 24 },
  { date: "2024-04-30", applications: 45, approvals: 38 },
  { date: "2024-05-01", applications: 36, approvals: 22 },
  { date: "2024-05-02", applications: 29, approvals: 21 },
  { date: "2024-05-03", applications: 25, approvals: 19 },
  { date: "2024-05-04", applications: 39, approvals: 32 },
  { date: "2024-05-05", applications: 48, approvals: 39 },
  { date: "2024-05-06", applications: 50, approvals: 42 },
  { date: "2024-05-07", applications: 39, approvals: 30 },
  { date: "2024-05-08", applications: 29, approvals: 21 },
  { date: "2024-05-09", applications: 27, approvals: 18 },
  { date: "2024-05-10", applications: 33, approvals: 27 },
  { date: "2024-05-11", applications: 34, approvals: 28 },
  { date: "2024-05-12", applications: 29, approvals: 24 },
  { date: "2024-05-13", applications: 27, approvals: 21 },
  { date: "2024-05-14", applications: 45, approvals: 39 },
  { date: "2024-05-15", applications: 47, approvals: 38 },
  { date: "2024-05-16", applications: 43, approvals: 35 },
  { date: "2024-05-17", applications: 50, approvals: 42 },
  { date: "2024-05-18", applications: 35, approvals: 29 },
  { date: "2024-05-19", applications: 25, approvals: 18 },
  { date: "2024-05-20", applications: 27, approvals: 23 },
  { date: "2024-05-21", applications: 22, approvals: 14 },
  { date: "2024-05-22", applications: 21, approvals: 17 },
  { date: "2024-05-23", applications: 32, approvals: 29 },
  { date: "2024-05-24", applications: 29, approvals: 23 },
  { date: "2024-05-25", applications: 30, approvals: 25 },
  { date: "2024-05-26", applications: 23, approvals: 17 },
  { date: "2024-05-27", applications: 42, approvals: 36 },
  { date: "2024-05-28", applications: 33, approvals: 29 },
  { date: "2024-05-29", applications: 28, approvals: 23 },
  { date: "2024-05-30", applications: 34, approvals: 28 },
  { date: "2024-05-31", applications: 28, approvals: 23 },
  { date: "2024-06-01", applications: 27, approvals: 22 },
  { date: "2024-06-02", applications: 47, approvals: 41 },
  { date: "2024-06-03", applications: 23, approvals: 16 },
  { date: "2024-06-04", applications: 44, approvals: 38 },
  { date: "2024-06-05", applications: 28, approvals: 21 },
  { date: "2024-06-06", applications: 34, approvals: 29 },
  { date: "2024-06-07", applications: 37, approvals: 32 },
  { date: "2024-06-08", applications: 39, approvals: 32 },
  { date: "2024-06-09", applications: 44, approvals: 38 },
  { date: "2024-06-10", applications: 25, approvals: 20 },
  { date: "2024-06-11", applications: 29, approvals: 22 },
  { date: "2024-06-12", applications: 49, approvals: 42 },
  { date: "2024-06-13", applications: 31, approvals: 23 },
  { date: "2024-06-14", applications: 42, approvals: 36 },
  { date: "2024-06-15", applications: 37, approvals: 31 },
  { date: "2024-06-16", applications: 41, approvals: 35 },
  { date: "2024-06-17", applications: 48, approvals: 42 },
  { date: "2024-06-18", applications: 27, approvals: 21 },
  { date: "2024-06-19", applications: 34, approvals: 29 },
  { date: "2024-06-20", applications: 41, approvals: 35 },
  { date: "2024-06-21", applications: 29, approvals: 24 },
  { date: "2024-06-22", applications: 32, approvals: 27 },
  { date: "2024-06-23", applications: 48, approvals: 43 },
  { date: "2024-06-24", applications: 32, approvals: 28 },
  { date: "2024-06-25", applications: 31, approvals: 24 },
  { date: "2024-06-26", applications: 43, approvals: 38 },
  { date: "2024-06-27", applications: 45, approvals: 39 },
  { date: "2024-06-28", applications: 29, approvals: 24 },
  { date: "2024-06-29", applications: 23, approvals: 18 },
  { date: "2024-06-30", applications: 45, approvals: 40 },
]

interface TimeRangeOption {
  value: string
  label: string
  days: number
}

const timeRangeOptions: TimeRangeOption[] = [
  { value: "90d", label: "Last 3 months", days: 90 },
  { value: "30d", label: "Last 30 days", days: 30 },
  { value: "7d", label: "Last 7 days", days: 7 },
];

const chartConfig = {
  mortgages: {
    label: "Mortgage Applications",
  },
  applications: {
    label: "Applications",
    color: "var(--primary)",
  },
  approvals: {
    label: "Approvals",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    
    const selectedOption = timeRangeOptions.find(option => option.value === timeRange);
    const daysToSubtract = selectedOption ? selectedOption.days : 90;
    
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Mortgage Applications</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Application and approval trends
          </span>
          <span className="@[540px]/card:hidden">Mortgage applications</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            {timeRangeOptions.map((option) => (
              <ToggleGroupItem key={option.value} value={option.value}>
                {option.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {timeRangeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className="rounded-lg">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillApplications" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-applications)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-applications)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillApprovals" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-approvals)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-approvals)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 10}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="approvals"
              type="natural"
              fill="url(#fillApprovals)"
              stroke="var(--color-approvals)"
              stackId="a"
            />
            <Area
              dataKey="applications"
              type="natural"
              fill="url(#fillApplications)"
              stroke="var(--color-applications)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
