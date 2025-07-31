export interface FormData {
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

export interface FormErrors {
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
}

export interface InputFieldProps {
    id: string;
    name: string;
    type?: 'text' | 'email' | 'password';
    label: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    icon?: React.ComponentType<{ className?: string }>;
    showPasswordToggle?: boolean;
    onTogglePassword?: () => void;
    showPassword?: boolean;
    required?: boolean;
    disabled?: boolean;
    className?: string;
}

export interface CheckboxFieldProps {
    id: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
}

export interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    className?: string;
    icon?: React.ComponentType<{ className?: string }>;
    iconPosition?: 'left' | 'right';
}