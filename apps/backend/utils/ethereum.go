package utils

import (
	"errors"
	"fmt"
	"strings"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/crypto"
)


func VerifySignature(taskID uint64, address string, signature string) (bool, error) {
    
    if !strings.HasPrefix(address, "0x") {
        return false, errors.New("address must start with 0x")
    }
    
   
    checksumAddress := common.HexToAddress(address).Hex()
    
    message := fmt.Sprintf("I completed task %d", taskID)
    
    prefixedMessage := fmt.Sprintf("\x19Ethereum Signed Message:\n%d%s", len(message), message)
    prefixedHash := crypto.Keccak256Hash([]byte(prefixedMessage))
    
    signatureBytes := common.FromHex(signature)
    
    if len(signatureBytes) != 65 {
        return false, errors.New("invalid signature length")
    }
    
    if signatureBytes[64] != 27 && signatureBytes[64] != 28 {
        return false, errors.New("invalid signature recovery value")
    }
    
    signatureBytes[64] -= 27
    
    recoveredPubKey, err := crypto.SigToPub(prefixedHash.Bytes(), signatureBytes)
    if err != nil {
        return false, fmt.Errorf("failed to recover public key: %v", err)
    }
    
    recoveredAddress := crypto.PubkeyToAddress(*recoveredPubKey).Hex()
    
    return strings.EqualFold(recoveredAddress, checksumAddress), nil
}