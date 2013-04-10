using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Perfin.Model
{
    public class Entry
    {
        public virtual  int Id { get; set; }
        public virtual decimal Price { get; set; }
        public virtual Account Account { get; set; }
        public virtual string Description { get; set; }
        

        //data da compra/receita
        public virtual DateTime RegistryDate { get; set; } 
        
        //data, geralmente mes, para pagamento/recebimento (geralmente em caso de cartao 
        //de credito ou movimentaçoes para pagamento/recebimento com mais de 30 dias)
        public virtual DateTime PaymentDate { get; set; } 

        //parcelamento ??? todo
    }
}
