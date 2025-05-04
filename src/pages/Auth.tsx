
import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Loader } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const registerSchema = loginSchema.extend({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  fullName: z.string().optional(),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const Auth = () => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { user, isLoading, signIn, signUp } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      username: '',
      fullName: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onLogin = async (values: z.infer<typeof loginSchema>) => {
    try {
      setIsSubmitting(true);
      console.log("Login submission with:", values.email);
      await signIn(values.email, values.password);
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onRegister = async (values: z.infer<typeof registerSchema>) => {
    try {
      setIsSubmitting(true);
      console.log("Register submission with:", values.email, values.username);
      await signUp(values.email, values.password, {
        username: values.username,
        full_name: values.fullName || '',
      });
      toast({
        title: "Registration successful",
        description: "Please check your email to confirm your account.",
      });
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: "Please try again with a different email or username.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Redirect if user is already authenticated
  if (user && !isLoading) {
    console.log("User authenticated, redirecting to:", location.state?.from?.pathname || '/');
    // If coming from a specific location, go back there after login
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  return (
    <PageContainer>
      <div className="max-w-md mx-auto my-12">
        <h1 className="text-4xl font-display text-slab-rust mb-6 text-center">SLAB CITY LEGENDS</h1>
        
        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 shadow-lg improved-card">
          <Tabs defaultValue="login" onValueChange={(value) => setAuthMode(value as 'login' | 'register')}>
            <TabsList className="grid grid-cols-2 w-full mb-6 pointer-events-auto relative z-20">
              <TabsTrigger value="login" className="pointer-events-auto">Login</TabsTrigger>
              <TabsTrigger value="register" className="pointer-events-auto">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="relative z-20 pointer-events-auto">
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4 pointer-events-auto">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="example@email.com" {...field} type="email" className="bg-white relative z-20" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} className="bg-white relative z-20" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-slab-copper hover:bg-slab-rust text-slab-cream relative z-20 pointer-events-auto"
                    disabled={isLoading || isSubmitting}
                  >
                    {isLoading || isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </span>
                    ) : 'Sign In'}
                  </Button>
                </form>
              </Form>
            </TabsContent>
            
            <TabsContent value="register" className="relative z-20 pointer-events-auto">
              <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4 pointer-events-auto">
                  <FormField
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="example@email.com" {...field} type="email" className="bg-white relative z-20" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={registerForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="username" {...field} className="bg-white relative z-20" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={registerForm.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} className="bg-white relative z-20" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} className="bg-white relative z-20" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={registerForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} className="bg-white relative z-20" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-slab-copper hover:bg-slab-rust text-slab-cream relative z-20 pointer-events-auto"
                    disabled={isLoading || isSubmitting}
                  >
                    {isLoading || isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account...
                      </span>
                    ) : 'Create Account'}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageContainer>
  );
};

export default Auth;
