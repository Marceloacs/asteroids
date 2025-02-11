import { useSignInOperation } from "@/operations/auth";
import { useState } from "react";
import { ChangeEvent, useCallback } from "react";

// Solo letras y números
const NAME_REGEX = /^[a-zA-Z0-9]+$/;

export const useUserSignIn = (onSuccess?: () => void) => {

    
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const onOpen = useCallback(() => {
        setIsOpen(true);
        setName("");
        setError("");
    }, [setName, setError, setIsOpen]);

    const onClose = useCallback(() => {
        setIsOpen(false);
        setName("");
        setError("");
    }, [setName, setError, setIsOpen]);

    const onSuccessHandler = useCallback(() => {
        onSuccess?.();
        onClose();
    }, [onSuccess, onClose]);

    const { mutate: signInOperation, isPending: isSigningIn, data: signInData } = useSignInOperation(onSuccessHandler);

    const isSuccess = signInData?.status === 200;

    const signIn = useCallback(() => {
        if (error) {
            return;
        }
        signInOperation(name);
    }, [name, signInOperation, error]);

    const onChangeName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const value = parseName(e.target.value);
        setName(value);
        if (!NAME_REGEX.test(value)) {
            setError("Name must contain only lowercase letters and numbers");
        } else {
            setError("");
        }
    }, [setName, setError]);

    function parseName(name: string) {
        return name.trim().toLowerCase().replace(/ /g, "");
    }


    return { signIn, isSigningIn, onChangeName, error, name, isSuccess, onOpen, onClose, isOpen }  
}
