// Define user roles for the system
export enum UserRole {
  BROKER = 'broker',
  ACCOUNT_EXECUTIVE = 'account_executive',
  UNDERWRITING_MANAGER = 'underwriting_manager',
  BRANCH_MANAGER = 'branch_manager',
  ADMIN = 'admin',
  LENDER = 'lender',
  BORROWER = 'borrower'
}

// Dummy users for each role
export const dummyUsers = [
  {
    id: '1',
    name: 'John Broker',
    email: 'broker@example.com',
    password: '12345678',
    role: UserRole.BROKER,
    avatar: '/avatars/broker.jpg',
  },

  {
    id: '2',
    name: 'Michael Executive',
    email: 'executive@example.com',
    password: '12345678',
    role: UserRole.ACCOUNT_EXECUTIVE,
    avatar: '/avatars/executive.jpg',
  },
  {
    id: '3',
    name: 'Emily Underwriter',
    email: 'underwriter@example.com',
    password: '12345678',
    role: UserRole.UNDERWRITING_MANAGER,
    avatar: '/avatars/underwriter.jpg',
  },
  {
    id: '4',
    name: 'David Branch',
    email: 'branch@example.com',
    password: '12345678',
    role: UserRole.BRANCH_MANAGER,
    avatar: '/avatars/branch.jpg',
  },
  {
    id: '5',
    name: 'Admin User',
    email: 'admin@example.com',
    password: '12345678',
    role: UserRole.ADMIN,
    avatar: '/avatars/admin.jpg',
  },
  {
    id: '6',
    name: 'Lender User',
    email: 'lender@example.com',
    password: '12345678',
    role: UserRole.LENDER,
    avatar: '/avatars/lender.jpg',
  },
  {
    id: '7',
    name: 'Borrower User',
    email: 'borrower@example.com',
    password: '12345678',
    role: UserRole.BORROWER,
    avatar: '/avatars/borrower.jpg',
  },
];

// Function to find a user by email and password (simulating authentication)
export const findUserByCredentials = (email: string, password: string) => {
  return dummyUsers.find(user => user.email === email && user.password === password);
};

// Get user by role
export const getUsersByRole = (role: UserRole) => {
  return dummyUsers.filter(user => user.role === role);
}; 