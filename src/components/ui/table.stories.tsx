import type { Meta, StoryObj } from "@storybook/react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell, TableCaption, TableFooter } from "./table";
import { Badge } from "./badge";

type Story = StoryObj;

const meta: Meta = {
  title: "UI/Table",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>john@example.com</TableCell>
          <TableCell>Admin</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>jane@example.com</TableCell>
          <TableCell>User</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Bob Johnson</TableCell>
          <TableCell>bob@example.com</TableCell>
          <TableCell>User</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const WithCaption: Story = {
  render: () => (
    <Table>
      <TableCaption>A list of recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>INV-001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>2024-01-15</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>INV-002</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell>2024-01-20</TableCell>
          <TableCell className="text-right">$500.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const WithBadges: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Stock</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Laptop</TableCell>
          <TableCell>
            <Badge>In Stock</Badge>
          </TableCell>
          <TableCell>45</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Mouse</TableCell>
          <TableCell>
            <Badge variant="outline">Low Stock</Badge>
          </TableCell>
          <TableCell>8</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Keyboard</TableCell>
          <TableCell>
            <Badge variant="destructive">Out of Stock</Badge>
          </TableCell>
          <TableCell>0</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Item</TableHead>
          <TableHead className="text-right">Quantity</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Widget A</TableCell>
          <TableCell className="text-right">2</TableCell>
          <TableCell className="text-right">$10.00</TableCell>
          <TableCell className="text-right">$20.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Widget B</TableCell>
          <TableCell className="text-right">3</TableCell>
          <TableCell className="text-right">$15.00</TableCell>
          <TableCell className="text-right">$45.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Widget C</TableCell>
          <TableCell className="text-right">1</TableCell>
          <TableCell className="text-right">$5.00</TableCell>
          <TableCell className="text-right">$5.00</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$70.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

export const Striped: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Salary</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[
          { id: 1, name: "Alice", dept: "Engineering", salary: "$95,000" },
          { id: 2, name: "Bob", dept: "Marketing", salary: "$75,000" },
          { id: 3, name: "Charlie", dept: "Engineering", salary: "$98,000" },
          { id: 4, name: "Diana", dept: "Sales", salary: "$85,000" },
          { id: 5, name: "Eve", dept: "HR", salary: "$65,000" },
        ].map((row, index) => (
          <TableRow key={row.id} className={index % 2 === 0 ? "bg-muted/50" : ""}>
            <TableCell>{row.id}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.dept}</TableCell>
            <TableCell>{row.salary}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const Compact: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="py-2">Date</TableHead>
          <TableHead className="py-2">Event</TableHead>
          <TableHead className="py-2">Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="py-2">2024-01-15</TableCell>
          <TableCell className="py-2">User signup</TableCell>
          <TableCell className="py-2">Account</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="py-2">2024-01-16</TableCell>
          <TableCell className="py-2">Payment received</TableCell>
          <TableCell className="py-2">Transaction</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="py-2">2024-01-17</TableCell>
          <TableCell className="py-2">Email sent</TableCell>
          <TableCell className="py-2">Communication</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const NoData: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Column 1</TableHead>
          <TableHead>Column 2</TableHead>
          <TableHead>Column 3</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
            No data available
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const MultilineContent: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Category</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Premium Package</TableCell>
          <TableCell>
            <div className="space-y-1">
              <p>High-quality service with priority support</p>
              <p className="text-xs text-muted-foreground">Includes analytics and reporting</p>
            </div>
          </TableCell>
          <TableCell>Business</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Standard Package</TableCell>
          <TableCell>
            <div className="space-y-1">
              <p>Reliable service with email support</p>
              <p className="text-xs text-muted-foreground">Basic features included</p>
            </div>
          </TableCell>
          <TableCell>Standard</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const Transactions: Story = {
  render: () => (
    <Table>
      <TableCaption>Recent transactions from your account.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Transaction ID</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>TXN-00001</TableCell>
          <TableCell>Jan 10, 2024</TableCell>
          <TableCell>Direct deposit</TableCell>
          <TableCell className="text-green-600">+$2,500.00</TableCell>
          <TableCell>
            <Badge>Completed</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>TXN-00002</TableCell>
          <TableCell>Jan 9, 2024</TableCell>
          <TableCell>Restaurant purchase</TableCell>
          <TableCell className="text-red-600">-$45.50</TableCell>
          <TableCell>
            <Badge variant="outline">Completed</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>TXN-00003</TableCell>
          <TableCell>Jan 8, 2024</TableCell>
          <TableCell>Online transfer</TableCell>
          <TableCell className="text-red-600">-$200.00</TableCell>
          <TableCell>
            <Badge variant="outline">Pending</Badge>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
