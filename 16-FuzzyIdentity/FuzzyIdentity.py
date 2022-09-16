from ethereum import utils
import os, sys

# generate EOA with the ability to deploy contract with appendix badc0de
def generate_eoa2():
    priv = utils.sha3(os.urandom(4096))
    addr = utils.checksum_encode(utils.privtoaddr(priv))
    i = 0
    while "badc0de" not in utils.decode_addr(utils.mk_contract_address(addr, 0)):

        priv = utils.sha3(os.urandom(4096))
        addr = utils.checksum_encode(utils.privtoaddr(priv))
        i += 1
        if i%5000 ==0:
            print(i)



    print('Address: {}\nPrivate Key: {}'.format(addr, priv.hex()))



generate_eoa2()
