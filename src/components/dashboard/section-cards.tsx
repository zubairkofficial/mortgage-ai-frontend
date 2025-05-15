import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface CardData {
  title: string
  value: string
  trend: "up" | "down"
  trendValue: string
  message: string
  description: string
}

export function SectionCards() {
  const cardsData: CardData[] = [
    {
      title: "Loan Origination",
      value: "$12,563,750",
      trend: "up",
      trendValue: "+8.3%",
      message: "Increased activity this month",
      description: "Total value of originated loans"
    },
    {
      title: "Approval Rate",
      value: "68.7%",
      trend: "down",
      trendValue: "-3.2%",
      message: "Slight decrease from last month",
      description: "Ratio of approved applications"
    },
    {
      title: "Active Applications",
      value: "1,458",
      trend: "up",
      trendValue: "+15.2%",
      message: "Strong application growth",
      description: "Currently in processing queue"
    },
    {
      title: "Avg. Processing Time",
      value: "18.5 days",
      trend: "down",
      trendValue: "-2.3 days",
      message: "Faster processing time",
      description: "From submission to decision"
    }
  ]

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {cardsData.map((card, index) => (
        <Card key={index} className="@container/card">
          <CardHeader>
            <CardDescription>{card.title}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {card.value}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                {card.trend === "up" ? <IconTrendingUp /> : <IconTrendingDown />}
                {card.trendValue}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {card.message} {card.trend === "up" ? <IconTrendingUp className="size-4" /> : <IconTrendingDown className="size-4" />}
            </div>
            <div className="text-muted-foreground">
              {card.description}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
