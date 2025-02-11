import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { JSX } from "react";
import { useUserSignIn } from "./user-sign-in";

interface Props {
  onSuccess?: () => void;
  children: JSX.Element;
}

const SignIn = ({ children, onSuccess }: Props) => {
  const { signIn, isSigningIn, onChangeName, name, error, isOpen, onOpen, onClose } = useUserSignIn(onSuccess);

  const isDisabled = !!error || !name;
  return (
    <Dialog open={isOpen} onOpenChange={onOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
          <DialogDescription>
            Sign in to your account to manage your favorite asteroids. If you do not have an account, your will be created automatically.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Input
            type="name"
            placeholder="YourUserName"
            onChange={onChangeName}
            value={name}
          />
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <DialogFooter className="flex flex-row justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
          {isSigningIn ? (
            <Button disabled>Signing In...</Button>
          ) : (
            <Button onClick={signIn} disabled={isDisabled}>Sign In</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SignIn;
